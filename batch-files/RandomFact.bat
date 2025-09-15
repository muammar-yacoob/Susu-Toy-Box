@echo off
color 0A
echo Random Fact Generator! 🤓
echo.

:loop
echo Getting a random fact...
echo.

powershell -Command "try { $fact = (Invoke-WebRequest 'https://uselessfacts.jsph.pl/random.json?language=en' -UseBasicParsing).Content | ConvertFrom-Json; Write-Host 'Did you know?' -ForegroundColor Yellow; Write-Host $fact.text -ForegroundColor White } catch { Write-Host 'Could not get a fact. Check your internet connection!' -ForegroundColor Red }"

echo.
echo.
set /p again="Want another fact? (y/n): "
if /i "%again%"=="y" goto loop
if /i "%again%"=="yes" goto loop

echo Thanks for learning with me! 📚
pause
