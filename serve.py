#!/usr/bin/env python3
"""
Empire Coach - Serveur local simple
Lance ce script puis ouvre l'URL sur ton iPhone pour installer l'app.
"""

import http.server
import socketserver
import socket

PORT = 8000

def get_local_ip():
    """Récupère l'IP locale pour affichage"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    """Handler personnalisé pour gérer les MIME types correctement"""
    
    def end_headers(self):
        # CORS headers pour autoriser les requêtes depuis n'importe où
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        
        # Cache headers
        if self.path.endswith('.jsx') or self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript; charset=utf-8')
        elif self.path.endswith('.json'):
            self.send_header('Content-Type', 'application/json; charset=utf-8')
        
        super().end_headers()
    
    def log_message(self, format, *args):
        """Log plus propre"""
        print(f"[{self.address_string()}] {format % args}")

if __name__ == "__main__":
    local_ip = get_local_ip()
    
    print("\n" + "="*60)
    print("🎮 EMPIRE COACH - Serveur Local")
    print("="*60)
    print(f"\n✅ Serveur démarré sur le port {PORT}")
    print(f"\n📱 Sur ton iPhone, ouvre Safari et va sur :")
    print(f"\n   http://{local_ip}:{PORT}")
    print(f"\n   (ou http://localhost:{PORT} si sur le même appareil)")
    print("\n💡 Ensuite :")
    print("   1. Appuie sur le bouton Partager")
    print("   2. Choisis 'Sur l'écran d'accueil'")
    print("   3. Confirme et lance l'app !")
    print("\n⏹️  Appuie sur Ctrl+C pour arrêter le serveur")
    print("\n" + "="*60 + "\n")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n👋 Serveur arrêté. À bientôt !")
    except OSError as e:
        print(f"\n❌ Erreur : Le port {PORT} est déjà utilisé.")
        print(f"   Essaie de changer le PORT dans serve.py ou tue le processus existant.")
        print(f"   Commande : lsof -ti:{PORT} | xargs kill -9")
