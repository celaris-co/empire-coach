#!/bin/bash

# Empire Coach - Lancement rapide
# Ce script lance le serveur de dev Vite avec exposition réseau

cd "$(dirname "$0")"

echo ""
echo "======================================================"
echo "💰 EMPIRE COACH - Serveur de développement"
echo "======================================================"
echo ""
echo "🚀 Lancement du serveur Vite..."
echo ""

npm run dev -- --host

echo ""
echo "👋 Serveur arrêté."
