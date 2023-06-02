cd ..

zip -r release_mic_user.zip . -x "scripts/*" -x "node_modules/*" -x "dist/*" -x ".vscode/*" -x "test/*" 

echo "¡Empaquetado completado!"