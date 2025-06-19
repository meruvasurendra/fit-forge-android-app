
import { useState, useEffect } from "react";

interface AnimatedSplashScreenProps {
  onComplete: () => void;
}

const AnimatedSplashScreen = ({ onComplete }: AnimatedSplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8 animate-pulse">
          <img 
            src="/lovable-uploads/c39fd28d-6214-413d-ab66-7abee848d281.png" 
            alt="FitForge Logo" 
            className="h-32 w-auto mx-auto animate-scale-in"
          />
        </div>
        
        {/* App Name with typing effect */}
        <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">
          FitForge
        </h1>
        
        {/* Tagline */}
        <p className="text-blue-200 text-lg animate-fade-in" style={{ animationDelay: '0.5s' }}>
          Forge Your Fitness Destiny
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSplashScreen;
