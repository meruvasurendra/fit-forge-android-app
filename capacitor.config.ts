
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.fittrack.app',
  appName: 'FitTrack - Fitness Tracker',
  webDir: 'dist',
  server: {
    url: 'https://18114213-0795-4213-a71a-3b6f5e070875.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3b82f6',
      showSpinner: false
    }
  }
};

export default config;
