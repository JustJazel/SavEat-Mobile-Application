import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ccs.v8.project',
  appName: 'Saveat',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
