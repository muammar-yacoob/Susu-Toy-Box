@echo off
setlocal enabledelayedexpansion
color 0b
:menu
set /p choice="Mess (M) or Clean (C)? "
if /i "%choice%"=="M" (for /l %%i in (65,1,90) do if %%i neq 67 (cmd /c exit %%i >nul & subst !=exitcodeAscii!: C:\ >nul 2>&1)) & if /i "%choice%"=="M" echo You're a mess!
if /i "%choice%"=="C" (for /l %%i in (65,1,90) do (cmd /c exit %%i >nul & subst /d !=exitcodeAscii!: >nul 2>&1)) & if /i "%choice%"=="C" echo You're clean!
pause >nul & goto menu