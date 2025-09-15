@echo off
color 0C
echo Space Explorer! 🚀
echo.

echo Getting space information...
echo.

powershell -Command "try { $space = (Invoke-WebRequest 'http://api.open-notify.org/astros.json' -UseBasicParsing).Content | ConvertFrom-Json; Write-Host 'People in Space Right Now:' -ForegroundColor Yellow; Write-Host 'Total: ' -NoNewline; Write-Host $space.number -ForegroundColor Green; Write-Host ''; Write-Host 'Astronauts:' -ForegroundColor Cyan; foreach ($person in $space.people) { Write-Host '- ' -NoNewline; Write-Host $person.name -ForegroundColor White; Write-Host ' on ' -NoNewline; Write-Host $person.craft -ForegroundColor Magenta } } catch { Write-Host 'Could not get space info. Check your internet connection!' -ForegroundColor Red }"

echo.
echo.
echo Want to know more about space? Visit NASA's website! 🌟
pause
