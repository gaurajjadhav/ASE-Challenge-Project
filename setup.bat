@echo off
echo 🎬 Setting up Movie Library...
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies. Make sure Node.js is installed.
    pause
    exit /b 1
)

echo.
echo 📝 Creating .env file...
if not exist .env (
    echo # The Movie Database API Key > .env
    echo # Get your free API key from https://www.themoviedb.org/settings/api >> .env
    echo VITE_TMDB_API_KEY=your_api_key_here >> .env
    echo ✅ .env file created!
) else (
    echo ✅ .env file already exists
)

echo.
echo 🚀 Setup complete!
echo.
echo Next steps:
echo 1. Get your free API key from https://www.themoviedb.org/settings/api
echo 2. Edit the .env file and replace "your_api_key_here" with your actual API key
echo 3. Run: npm run dev
echo.
echo Press any key to continue...
pause > nul





