# 🚀 Lancement Empire Coach - RÉPARÉ

## ✅ Ce qui a été corrigé

L'app pointait vers une version réduite (`src/App.jsx` - 256 lignes avec quiz statiques).

**Fix appliqué :**
- ✅ Remplacé par le code complet `EmpireCoach.jsx` (1977 lignes)
- ✅ 12 piliers au lieu de 5
- ✅ IA Claude avec coaching adaptatif
- ✅ Système complet de gamification (XP, rangs, gemmes, streaks)
- ✅ Build Vite validé sans erreurs

---

## 🎮 Lancer l'app (PRODUCTION - recommandé)

### Option 1 : Serveur Python simple (le plus simple)

```bash
cd /data/.openclaw/workspace/projects/empire-coach

# Build de production (une seule fois)
npm run build

# Lance le serveur
python3 serve-prod.py
```

✅ **Accessible sur ton réseau local** : `http://[IP-LOCALE]:8000`

📱 **Sur ton iPhone/Android :**
1. Ouvre Safari (iOS) ou Chrome (Android)
2. Va sur l'URL affichée
3. Appuie sur Partager > "Sur l'écran d'accueil"
4. Lance comme une vraie app !

---

### Option 2 : Serveur de développement (pour modifier le code)

```bash
cd /data/.openclaw/workspace/projects/empire-coach

# Lance Vite en mode dev avec hot-reload
./START.sh
```

✅ Accessible sur : `http://localhost:5173` (ou IP réseau affichée)

---

## 🔑 Clé API Anthropic

À la première utilisation, l'app te demandera ta clé API :

1. Va sur https://console.anthropic.com
2. Crée un compte (5$ gratuits)
3. Génère une clé API
4. Colle-la dans l'app

**Note :** La clé n'est jamais sauvegardée (sécurité), entre-la à chaque session.

---

## 📦 Déploiement en ligne (optionnel)

### Vercel (gratuit, ultra rapide)

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
git init
git add .
git commit -m "Empire Coach"
git remote add origin https://github.com/TON-USERNAME/empire-coach.git
git push -u origin main

# Active Pages dans Settings > Pages > Source: main
```

---

## 🔧 Structure

```
empire-coach/
├── src/
│   ├── App.jsx         ← CODE COMPLET (1977 lignes) ✅
│   └── main.jsx        ← Point d'entrée React
├── dist/               ← Build de production (après npm run build)
├── EmpireCoach.jsx     ← Code source original (backup)
├── serve-prod.py       ← Serveur Python production
├── START.sh            ← Script de lancement dev
└── package.json        ← Config Vite + React
```

---

## 🎯 Fonctionnalités complètes

✅ **12 piliers** : Mindset, Finance, Économie, Droit, Entrepreneuriat, Marketing, Vente, Management, Investissement, Stratégie, Holding, Influence

✅ **IA adaptative** : Claude Sonnet 4 avec recherche web temps réel

✅ **Gamification** : 
- Rangs : Apprenti → Marchand → Stratège → Magnat → Empereur
- XP : +50 base, +100 bonne réponse, +200 parfait
- Gemmes : 1 par réponse parfaite
- Streaks : bonus multiplicateur

✅ **PWA** : Installable comme app native iOS/Android

✅ **Mémoire** : Progression sauvegardée automatiquement

---

## 💰 Coût

- **Infrastructure** : 0€ (serveur local)
- **API Claude** : ~0.01-0.05€ par session
- **Total** : Pratiquement gratuit

---

## 🐛 Dépannage

**Port 8000 déjà utilisé ?**
```bash
lsof -ti:8000 | xargs kill -9
```

**Erreur npm ?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build échoue ?**
```bash
npm run build 2>&1 | tee build.log
# Envoie-moi build.log
```

---

**L'app est COMPLÈTE et OPÉRATIONNELLE.** 🎮

*Réparé par Cash • Mars 2026*
