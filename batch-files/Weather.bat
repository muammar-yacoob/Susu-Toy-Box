@echo off
color 0B
echo Weather Wizard! 🌤️
echo.

set /p city="Enter a city name (or press Enter for your location): "

echo.
echo Getting weather info... ⏳

if "%city%"=="" (
    powershell -Command "try { $ip = (Invoke-WebRequest 'http://ip-api.com/json' -UseBasicParsing).Content | ConvertFrom-Json; $weather = (Invoke-WebRequest \"http://wttr.in/$($ip.city)?format=3\" -UseBasicParsing).Content; Write-Host \"Weather in $($ip.city): $weather\" } catch { Write-Host 'Could not get weather info. Check your internet connection!' }"
) else (
    powershell -Command "try { $weather = (Invoke-WebRequest \"http://wttr.in/%city%?format=3\" -UseBasicParsing).Content; Write-Host \"Weather in %city%: $weather\" } catch { Write-Host 'Could not get weather info. Check your internet connection!' }"
)

echo.
echo Press any key to try another city or close...
pause >nul
goto :eof
