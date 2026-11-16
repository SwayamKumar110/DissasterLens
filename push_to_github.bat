@echo off
title Push DisasterLens AI to GitHub
echo ===================================================
echo     Pushing DisasterLens AI to GitHub Repository
echo     Target: https://github.com/SwayamKumar110/DissasterLens.git
echo ===================================================
echo.
cd /d %~dp0

echo Checking git status...
git status
echo.

echo Pushing branch 'main' to remote 'origin'...
echo (If prompted, please sign in via your browser window)
echo.
git push -u origin main

echo.
echo ===================================================
echo Process complete.
echo ===================================================
pause
