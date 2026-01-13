import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vaishnaviorganics.store',
  appName: 'Vaishnavi Organics',
  webDir: 'out',
  server: {
    url: 'https://your-deployed-site.com', // ⚠️ REPLACE this with your actual Vercel/Production URL
    cleartext: true
  }
};

export default config;
