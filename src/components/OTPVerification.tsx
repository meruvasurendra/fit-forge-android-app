import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OTPVerificationProps {
  phone: string;
  onVerify: (otp: string) => Promise<void>;
  onBack: () => void;
}

const OTPVerification = ({ phone, onVerify, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setIsLoading(true);
    try {
      if (otp !== "123456") {
        throw new Error("Invalid OTP");
      }

      // Simulate successful OTP verification
      await onVerify(otp);
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification Failed",
        description: "Please enter 123456 to proceed (testing mode)",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
    toast({
      title: "OTP Resent! 📱",
      description: `New verification code sent to ${phone}`,
    });
    // Resend logic can be implemented here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="absolute top-4 left-4 p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/c39fd28d-6214-413d-ab66-7abee848d281.png" 
              alt="FitForge Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Verify Your Phone</CardTitle>
          <p className="text-gray-600">
            Enter the 6-digit code sent to<br />
            <span className="font-semibold">{phone}</span>
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <Button 
            onClick={handleVerify}
            disabled={otp.length !== 6 || isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{" "}
              <span 
                className="text-blue-600 cursor-pointer hover:underline" 
                onClick={handleResendOTP}
              >
                Resend OTP
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
