
import { useState, useEffect } from "react";

interface AnimatedSplashScreenProps {
  onComplete: () => void;
}

const AnimatedSplashScreen = ({ onComplete }: AnimatedSplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [showDumbbell, setShowDumbbell] = useState(false);
  const [showFire, setShowFire] = useState(false);

  useEffect(() => {
    // Animation sequence
    const dumbbellTimer = setTimeout(() => {
      setShowDumbbell(true);
    }, 300);

    const fireTimer = setTimeout(() => {
      setShowFire(true);
    }, 800);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 2500);

    return () => {
      clearTimeout(dumbbellTimer);
      clearTimeout(fireTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="text-center relative">
        {/* Animated Dumbbell */}
        <div className={`mb-8 transition-all duration-500 ${showDumbbell ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <div className="relative">
            <div className="text-8xl animate-pulse">🏋️‍♀️</div>
            
            {/* Fire Animation on top of dumbbell */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${showFire ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
              <div className="relative">
                {/* Animated fire with orange-red gradient */}
                <div className="text-6xl animate-bounce" style={{ 
                  filter: 'hue-rotate(20deg) saturate(1.5)',
                  textShadow: '0 0 20px rgba(255, 69, 0, 0.8), 0 0 40px rgba(255, 140, 0, 0.6)'
                }}>
                  🔥
                </div>
                {/* Additional fire effects */}
                <div className="absolute -top-2 -left-2 text-3xl animate-pulse opacity-70" style={{
                  filter: 'hue-rotate(10deg)',
                  animationDelay: '0.2s'
                }}>
                  🔥
                </div>
                <div className="absolute -top-2 -right-2 text-3xl animate-pulse opacity-70" style={{
                  filter: 'hue-rotate(30deg)',
                  animationDelay: '0.4s'
                }}>
                  🔥
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* App Name with typing effect */}
        <h1 className={`text-4xl font-bold text-white mb-4 transition-all duration-500 ${showDumbbell ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          FitForge
        </h1>
        
        {/* Tagline */}
        <p className={`text-orange-200 text-lg transition-all duration-500 ${showFire ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Forge Your Fitness Destiny
        </p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSplashScreen;
