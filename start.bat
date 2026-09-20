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
    echo  [INFO] Python no encontrado en el sistema.
    echo  Descargando e instalando Python de forma automatica...
    echo  Por favor, espera. Esto puede tardar un par de minutos.
    
    :: Descargar instalador de Python usando curl (incluido en Windows 10/11)
    curl -# -o python_installer.exe https://www.python.org/ftp/python/3.11.8/python-3.11.8-amd64.exe
    
    if exist python_installer.exe (
        :: Instalar silenciosamente solo para el usuario actual y agregarlo al PATH
        start /wait python_installer.exe /quiet InstallAllUsers=0 PrependPath=1 Include_test=0
        del python_installer.exe
        
        echo  [INFO] Instalacion completada.
        echo  [INFO] Reiniciando el script para aplicar los cambios...
        
        :: El PATH se actualizo en el sistema pero no en esta consola,
        :: asi que volvemos a ejecutar el script en una consola nueva y cerramos esta.
        start cmd /c "%~f0"
        exit
    ) else (
        echo  [ERROR] No se pudo descargar Python. Verifica tu conexion a internet.
        pause
        exit /b 1
    )
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
