import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.heardapp.mobile',
  appName: 'Heard',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#F5F5DC",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#D4A5A5",
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: "launch_screen",
      useDialog: true,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#F5F5DC'
    }
  },
  ios: {
    scheme: 'Heard',
    bundleId: 'com.heardapp.mobile',
    teamId: 'YOUR_TEAM_ID', // Replace with your Apple Developer Team ID
    provisioningProfile: 'Heard_App_Store_Provisioning_Profile', // Replace with your profile name
    distributionCertificate: 'Heard_Distribution_Certificate', // Replace with your certificate name
  },
  android: {
    package: 'com.heardapp.mobile',
    versionCode: 1,
    minSdkVersion: 22,
    targetSdkVersion: 33,
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  }
};

export default config;
