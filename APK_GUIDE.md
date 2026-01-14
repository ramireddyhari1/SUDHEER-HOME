# 📱 How to Build Your Android APK

I have generated the separate Android project files in the `android/` folder.

## ⚠️ Important Step First
1.  **Deploy your website** (e.g., to Vercel).
2.  Open `capacitor.config.ts` in your project.
3.  Change `url: 'https://your-deployed-site.com'` to your **Actual Live URL**.
4.  Run `npx cap sync` in the terminal.

## 🏗️ Build the APK
1.  Download & Install **Android Studio**.
2.  Open the `android/` folder (inside `sweet`) in Android Studio.
3.  Wait for Gradle to sync (it downloads dependencies).
4.  Go to **Build > Build Bundle(s) / APK(s) > Build APK**.
5.  Locate the APK in `android/app/build/outputs/apk/debug/app-debug.apk`.

This APK will wrap your live website, giving you a native app feel while keeping your data real-time! 🚀
