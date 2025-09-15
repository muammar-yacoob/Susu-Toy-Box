@echo off
color 0D
echo ASCII Art Gallery!
echo.

:menu
echo Choose your art:
echo 1. Robot
echo 2. Cat
echo 3. Heart
echo 4. Random
echo 5. Quit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" goto robot
if "%choice%"=="2" goto cat
if "%choice%"=="3" goto heart
if "%choice%"=="4" goto random
if "%choice%"=="5" goto end
goto menu

:robot
echo.
echo     _____
echo    /     \
echo   |  O O  |
echo   |   ^   |
echo   |  \_/  |
echo    \_____/
echo.
goto menu

:cat
echo.
echo    /\_/\  
echo   ( o.o ) 
echo    > ^ <
echo.
goto menu

:heart
echo.
echo   @@@   @@@
echo  @   @ @   @
echo @     @     @
echo  @         @
echo   @       @
echo    @     @
echo     @   @
echo      @ @
echo       @
echo.
goto menu

:random
set /a num=%random% %% 3 + 1
if %num%==1 goto robot
if %num%==2 goto cat
if %num%==3 goto heart

:end
echo Thanks for visiting the ASCII Art Gallery!
pause
