# DisasterLens AI Launcher for PowerShell
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "     DisasterLens AI - Multimodal System" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting Backend (FastAPI on port 8000)..." -ForegroundColor Yellow
Start-Process cmd.exe -ArgumentList "/k", "cd /d `"$rootDir\backend`" && .venv\Scripts\uvicorn.exe app.main:app --host 127.0.0.1 --port 8000 --reload" -WindowStyle Normal

Write-Host "Starting Frontend (Vite on port 5173)..." -ForegroundColor Yellow
Start-Process cmd.exe -ArgumentList "/k", "cd /d `"$rootDir\frontend`" && npm.cmd run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "Opening http://localhost:5173 in browser..." -ForegroundColor Green
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "DisasterLens AI is now running!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend:  http://127.0.0.1:8000"
Write-Host "API Docs: http://127.0.0.1:8000/docs"
Write-Host "===================================================" -ForegroundColor Cyan

