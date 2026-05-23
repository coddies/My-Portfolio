@echo off
echo ============================================
echo  Installing VS Code Extensions for Portfolio
echo ============================================

echo [1/8] Live Server (open HTML in browser with hot reload)
code --install-extension ritwickdey.liveserver --force

echo [2/8] Auto Rename Tag
code --install-extension formulahendry.auto-rename-tag --force

echo [3/8] Auto Close Tag
code --install-extension formulahendry.auto-close-tag --force

echo [4/8] HTML CSS Class IntelliSense
code --install-extension zignd.html-css-class-completion --force

echo [5/8] Path IntelliSense
code --install-extension christian-kohler.path-intellisense --force

echo [6/8] Color Highlight
code --install-extension naumovs.color-highlight --force

echo [7/8] Tailwind CSS IntelliSense
code --install-extension bradlc.vscode-tailwindcss --force

echo [8/8] Prettier Formatter
code --install-extension esbenp.prettier-vscode --force

echo.
echo ============================================
echo  Done! Please RELOAD VS Code:
echo  Press Ctrl+Shift+P -> type "Reload Window"
echo ============================================
pause
