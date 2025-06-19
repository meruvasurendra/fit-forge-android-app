
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
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      if (loginMethod === 'email') {
        // Email login with password
        if (!email || !password) {
          toast({
            title: "Missing Information",
            description: "Please enter both email and password",
            variant: "destructive"
          });
          return;
        }
        
        // Check if user exists in localStorage
        const savedUsers = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
        const existingUser = savedUsers.find((user: any) => user.email === email);
        
        if (existingUser && existingUser.password === password) {
          onAuthComplete(existingUser);
          toast({
            title: "Welcome back! 🔥",
            description: "Successfully logged in to FitForge",
          });
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password",
            variant: "destructive"
          });
        }
      } else {
        // Phone login with OTP
        if (!phone) {
          toast({
            title: "Missing Information",
            description: "Please enter your phone number",
            variant: "destructive"
          });
          return;
        }
        
        // Move to OTP verification
        setAuthStep('otp');
        toast({
          title: "OTP Sent! 📱",
          description: `Verification code sent to ${phone}`,
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = (otp: string) => {
    // Simulate OTP verification (in real app, this would be validated with backend)
    if (otp === '123456') {
      // Check if user exists or create new user
      const savedUsers = JSON.parse(localStorage.getItem('fitforge_users') || '[]');
      let existingUser = savedUsers.find((user: any) => user.phone === phone);
      
      if (!existingUser) {
        // Create new user for phone login
        existingUser = {
          id: Date.now().toString(),
          phone: phone,
          name: `User ${phone.slice(-4)}`,
          loginMethod: 'phone',
          createdAt: new Date().toISOString()
        };
        savedUsers.push(existingUser);
        localStorage.setItem('fitforge_users', JSON.stringify(savedUsers));
      }
      
      onAuthComplete(existingUser);
      toast({
        title: "Welcome! 🔥",
        description: "Successfully verified and logged in",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct verification code",
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
                  placeholder="+1 (555) 000-0000"
                  className="mt-2"
                />
              </div>
              <p className="text-sm text-gray-600">
                We'll send you a verification code via SMS
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
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Sign up instead
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
