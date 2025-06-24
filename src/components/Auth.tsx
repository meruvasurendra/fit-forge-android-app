import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import OTPVerification from "./OTPVerification";

interface AuthProps {
  onAuthComplete: (userData: any) => void;
}

const Auth = ({ onAuthComplete }: AuthProps) => {
  const [authStep, setAuthStep] = useState<'login' | 'otp'>('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      if (loginMethod === 'email') {
        if (!email || !password) {
          toast({
            title: "Missing Information",
            description: "Please enter both email and password",
            variant: "destructive"
          });
          return;
        }

        // TODO: Add real email login logic here
        toast({
          title: "Login Skipped",
          description: "Simulated email login (testing mode)",
        });
        onAuthComplete({ email });
      } else {
        // Phone login with test-only logic
        if ( phone.length !== 10 || !/^\d{10}$/.test(phone)) {
          toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid 10-digit number",
            variant: "destructive"
          });
          return;
        }

        // Simulate OTP sent
        setAuthStep('otp');
        toast({
          title: "OTP Sent! 📱",
          description: `Use code 123456 to log in (test mode)`,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (otp: string) => {
    try {
      if (otp !== "123456") {
        throw new Error("Invalid OTP");
      }

      toast({
        title: "Welcome! 🔥",
        description: "Successfully logged in (test mode)",
      });

      onAuthComplete({ phone });
    } catch (error) {
      toast({
        title: "Invalid OTP",
        description: "Please enter 123456 to proceed",
        variant: "destructive"
      });
    }
  };

  if (authStep === 'otp') {
    return (
      <OTPVerification
        phone={phone}
        onVerify={handleOTPVerification}
        onBack={() => setAuthStep('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/lovable-uploads/c39fd28d-6214-413d-ab66-7abee848d281.png"
              alt="FitForge Logo"
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to FitForge</CardTitle>
          <p className="text-gray-600">Sign in to continue your fitness journey</p>
        </CardHeader>
        <CardContent>
          <Tabs value={loginMethod} onValueChange={(value) => setLoginMethod(value as 'email' | 'phone')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone">Phone</TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="mt-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="phone" className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter 10-digit number"
                  className="mt-2"
                />
              </div>
              <p className="text-sm text-gray-600">
                We'll send you a verification code (test: 123456)
              </p>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            {isLoading ? "Signing In..." : loginMethod === 'email' ? "Sign In" : "Send OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
