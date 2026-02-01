@echo off
echo Stopping current WhatsApp server...
taskkill /F /FI "WINDOWTITLE eq WhatsApp Server*" 2>nul
timeout /t 2 /nobreak >nul

echo Starting WhatsApp Server...
echo.
echo IMPORTANT: Look for the QR code in the output below
echo Scan it with WhatsApp on your phone:
echo   Settings -^> Linked Devices -^> Link a Device
echo.
echo ============================================
node scripts/whatsapp-server.js
