
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
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
        // Email login with password
        if (!email || !password) {
          toast({
            title: "Missing Information",
            description: "Please enter both email and password",
            variant: "destructive"
          });
          return;
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Login Failed",
              description: "Invalid email or password",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Login Error",
              description: error.message,
              variant: "destructive"
            });
          }
        } else if (data.user) {
          toast({
            title: "Welcome back! 🔥",
            description: "Successfully logged in to FitForge",
          });
          // The auth state change will be handled by the Index component
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
        
        const { error } = await supabase.auth.signInWithOtp({
          phone: phone
        });

        if (error) {
          toast({
            title: "OTP Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          // Move to OTP verification
          setAuthStep('otp');
          toast({
            title: "OTP Sent! 📱",
            description: `Verification code sent to ${phone}`,
          });
        }
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

  const handleOTPVerification = async (otp: string) => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms'
      });

      if (error) {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct verification code",
          variant: "destructive"
        });
      } else if (data.user) {
        toast({
          title: "Welcome! 🔥",
          description: "Successfully verified and logged in",
        });
        // The auth state change will be handled by the Index component
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSignUp = async () => {
    if (loginMethod === 'email') {
      if (!email || !password) {
        toast({
          title: "Missing Information",
          description: "Please enter both email and password",
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Check your email! 📧",
            description: "We sent you a confirmation link",
          });
        }
      } catch (error) {
        toast({
          title: "Sign Up Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
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
          
          {loginMethod === 'email' && (
            <Button 
              onClick={handleSignUp}
              disabled={isLoading}
              variant="outline"
              className="w-full mt-2"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          )}
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {loginMethod === 'email' ? "New to FitForge? Use Sign Up button above" : "Don't have an account? Switch to Email tab"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
