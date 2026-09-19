@echo off
title Sombrero Seleccionador — UTN FRRE
color 0A

echo.
echo  ==========================================
echo    SOMBRERO SELECCIONADOR — UTN FRRE
echo  ==========================================
echo.
echo  Iniciando servidor local...

:: Buscar Python
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo  [ERROR] Python no encontrado. Instalar Python 3 y volver a intentar.
    pause
    exit /b 1
)

:: Puerto
set PORT=8080

:: Ir a la carpeta del proyecto (donde está este .bat)
cd /d "%~dp0"

:: Abrir el navegador en modo kiosco despues de 2 segundos
start "" cmd /c "timeout /t 2 /nobreak >nul && start chrome --kiosk --disable-infobars --no-first-run http://localhost:%PORT%"

echo  Servidor corriendo en: http://localhost:%PORT%
echo  Cerrá esta ventana para apagar el servidor.
echo.

:: Levantar servidor HTTP de Python (sirve el directorio actual)
python -m http.server %PORT%
