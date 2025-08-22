@echo off
echo ========================================
echo    Heard App Mobile Build Script
echo ========================================
echo.

echo Step 1: Building web app...
call npm run build

echo.
echo Step 2: Syncing to mobile platforms...
call npx cap sync

echo.
echo Step 3: Opening platforms...
echo.
echo For Android:
echo 1. Run: npx cap open android
echo 2. In Android Studio: Build -> Build Bundle(s) / APK(s)
echo.
echo For iOS (Mac only):
echo 1. Run: npx cap open ios
echo 2. In Xcode: Product -> Archive
echo.
echo ========================================
echo Build process completed!
echo ========================================
pause
