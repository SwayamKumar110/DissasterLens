@echo off
title DisasterLens AI Launcher
echo ===================================================
echo      DisasterLens AI - Multimodal System
echo ===================================================
echo.
echo Starting Backend (FastAPI on port 8000)...
start "DisasterLens Backend (FastAPI)" cmd /k "cd /d %~dp0backend && .venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload"

echo Starting Frontend (Vite on port 5173)...
start "DisasterLens Frontend (Vite)" cmd /k "cd /d %~dp0frontend && npm.cmd run dev"

echo.
echo Waiting for servers to initialize...
timeout /t 3 >nul

echo Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo ===================================================
echo DisasterLens AI is now running!
echo - Frontend: http://localhost:5173
echo - Backend:  http://127.0.0.1:8000
echo - API Docs: http://127.0.0.1:8000/docs
echo.
echo (Keep the two terminal windows open while using the app)
echo ===================================================
pause

