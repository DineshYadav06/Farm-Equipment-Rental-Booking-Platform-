@echo off
echo ========================================================
echo   Starting FarmRentHub (FastAPI Backend + Next.js App)
echo ========================================================

echo [1/2] Starting FastAPI Backend on http://localhost:8000 ...
start "FarmRentHub Backend" cmd /k "cd backend && python -m uvicorn app.main:app --reload --port 8000"

timeout /t 3

echo [2/2] Starting Next.js Frontend on http://localhost:3000 ...
start "FarmRentHub Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   FarmRentHub is starting up!
echo   Frontend : http://localhost:3000
echo   API Docs : http://localhost:8000/api/docs
echo ========================================================
