@echo off
color 0F
echo Cat Picture Generator! 🐱
echo.

echo Getting a random cat picture...
echo.

powershell -Command "try { $cat = (Invoke-WebRequest 'https://api.thecatapi.com/v1/images/search' -UseBasicParsing).Content | ConvertFrom-Json; Write-Host 'Here is your cat picture!' -ForegroundColor Green; Write-Host 'URL: ' -NoNewline; Write-Host $cat[0].url -ForegroundColor Cyan; Write-Host ''; Write-Host 'Copy this URL and paste it in your browser to see the cat!' -ForegroundColor Yellow } catch { Write-Host 'Could not get cat picture. Check your internet connection!' -ForegroundColor Red }"

echo.
echo.
set /p again="Want another cat? (y/n): "
if /i "%again%"=="y" goto :eof
if /i "%again%"=="yes" goto :eof

echo Meow! Thanks for loving cats! 🐾
pause
