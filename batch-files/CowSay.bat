@echo off
color 0E
echo Starting Cow Say Machine...
echo.

:menu
set /p message="What should the cow say? (or 'quit' to exit): "
if /i "%message%"=="quit" goto end

echo.
echo _________________________________________________
echo %message%
echo _________________________________________________
echo     \   ^__^
echo      \  (oo)\_______
echo         (__)\       )\/\
echo             ||----w |
echo             ||     ||
echo.

goto menu

:end
echo Goodbye! The cow is going to sleep... zzz
pause
