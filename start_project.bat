@echo off
echo ==============================================
echo Installing Dependencies and Starting Backend...
echo ==============================================
start cmd /k "cd server && npm install && npm run dev"

timeout /t 5

echo ==============================================
echo Installing Dependencies and Starting Frontend...
echo ==============================================
start cmd /k "cd client && npm install && npm run dev"

echo Done! Two new terminal windows should open to run your apps.
