# 💰 Empire Coach

**Construis ton empire. Sans limite.**

Une plateforme d'apprentissage gamifiée style jeu mobile pour maîtriser l'entrepreneuriat, la finance, l'investissement et tout ce qu'il faut pour bâtir un empire financier.

## ✨ Fonctionnalités

- 🎮 **Interface de jeu mobile** - Style Duolingo / Clash Royale avec animations, XP, niveaux, récompenses
- 🧠 **IA adaptative** - Parcours personnalisé alimenté par Claude avec recherche web temps réel
- 🔥 **Gamification complète** - Rangs (Apprenti → Empereur), streaks, gemmes, cartes de progression
- 🗺️ **Map de progression** - 12 piliers déblocables (Mindset, Finance, Marketing, Stratégie...)
- 📱 **PWA installable** - Fonctionne comme une vraie app sur iOS et Android
- 💾 **Mémoire persistante** - Sauvegarde automatique de ta progression
- ⚡ **Toujours à jour** - Le coach cherche les meilleures pratiques et outils du moment

## 📱 Installation sur iOS

### Méthode 1 : Via serveur local (le plus simple)

1. **Lance le serveur** :
   ```bash
   cd /data/.openclaw/workspace/projects/empire-coach
   python3 serve.py
   ```

2. **Sur ton iPhone** :
   - Ouvre Safari
   - Va sur l'URL affichée (ex: `http://192.168.1.X:8000`)
   - Appuie sur le bouton Partager (en bas au milieu)
   - Scroll down et choisis "Sur l'écran d'accueil"
   - Nomme l'app "Empire Coach" et confirme

3. **Lance l'app** depuis ton écran d'accueil comme n'importe quelle app native !

### Méthode 2 : Via hébergement gratuit

Tu peux héberger gratuitement sur :
- **GitHub Pages** (gratuit, illimité)
- **Vercel** (gratuit, ultra rapide)
- **Netlify** (gratuit, simple)

Instructions détaillées dans la section "Déploiement" ci-dessous.

## 🚀 Utilisation

### Première session

1. Appuie sur "COMMENCER"
2. L'IA te pose des questions d'évaluation initiale
3. Réponds honnêtement pour obtenir un parcours adapté
4. Les premiers piliers se débloquent

### Interface

- **Map** : Navigue entre les 12 piliers, clique sur les nœuds débloqués
- **Leçon** : Chat avec le coach, réponds aux questions, gagne de l'XP
- **Stats** : Panneau complet avec ta progression détaillée
- **Header** : Ton avatar circulaire montre ta progression vers le prochain rang

### Système de progression

- **XP** : +50 base, +100 bonne réponse, +200 parfait
- **Rangs** : Apprenti (0) → Marchand (1k) → Stratège (5k) → Magnat (15k) → Empereur (50k+)
- **Gemmes** : 1 gemme par réponse parfaite (score >= 9/10)
- **Streak** : Bonus multiplicateur si tu reviens chaque jour

### Clé API

À la première utilisation, l'app te demandera ta clé API Anthropic :
- Va sur https://console.anthropic.com
- Crée un compte (5$ gratuits)
- Génère une clé API
- Colle-la quand l'app la demande

**Note** : La clé n'est jamais sauvegardée par sécurité, tu devras la coller à chaque session.

## 🛠️ Déploiement (hébergement gratuit)

### GitHub Pages

```bash
# 1. Crée un repo GitHub
# 2. Push le dossier empire-coach
git init
git add .
git commit -m "Empire Coach"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/empire-coach.git
git push -u origin main

# 3. Active GitHub Pages dans Settings > Pages > Source: main branch
# 4. Ton app sera sur https://TON-USERNAME.github.io/empire-coach/
```

### Vercel (le plus rapide)

```bash
# 1. Installe Vercel CLI
npm install -g vercel

# 2. Deploy
vercel

# 3. Suis les instructions, c'est automatique
```

### Netlify

```bash
# 1. Installe Netlify CLI
npm install -g netlify-cli

# 2. Deploy
netlify deploy --prod

# 3. Drag & drop le dossier ou link ton repo GitHub
```

## 📂 Structure

```
empire-coach/
├── index.html           # Point d'entrée HTML
├── EmpireCoach.jsx      # Composant React complet (tout le code)
├── manifest.json        # Manifest PWA
├── sw.js               # Service Worker (mode offline)
├── serve.py            # Serveur local simple
├── README.md           # Ce fichier
└── icons/              # À créer (voir ci-dessous)
    ├── icon-192.png
    └── icon-512.png
```

## 🎨 Icônes (optionnel mais recommandé)

Pour une vraie app, crée 2 icônes :
- `icon-192.png` : 192x192px
- `icon-512.png` : 512x512px

Design suggéré :
- Fond : dégradé sombre (#07080C → #0E1018)
- Logo : "E" doré (#D4AF37) dans un cercle
- Style : moderne, minimaliste, premium

Tu peux utiliser :
- **Figma** (gratuit)
- **Canva** (gratuit)
- **Photopea** (gratuit, dans le navigateur)

Ou demande-moi de générer une icône avec une IA !

## 🧠 Les 12 Piliers

0. 🧠 **Mindset & Psychologie** - Mental de gagnant, résilience, ambition
1. 📊 **Comptabilité & Finance** - Fondamentaux + outils IA (Pennylane, Dext)
2. 🌍 **Économie & Macro** - Comprendre les cycles, marchés, tendances + analyse IA
3. ⚖️ **Droit des Affaires** - Structures juridiques, contrats + legaltech IA
4. 🚀 **Entrepreneuriat** - Créer, valider, lancer + lean startup augmenté IA
5. 📈 **Marketing & Growth** - Acquisition, conversion + AI marketing, agents
6. 🤝 **Vente & Négociation** - Convaincre, closer + automatisation IA
7. 👑 **Management & Leadership** - Diriger des équipes humaines + hybrides IA
8. 💰 **Investissement** - Actions, immobilier, crypto + screening IA
9. ♟️ **Stratégie & Concurrence** - Positionnement, avantage + veille IA
10. 🏛️ **Holding & Architecture** - Structurer un groupe + outils IA
11. 🔱 **Influence & Pouvoir** - Personal branding, réseau + IA contenu

## 🔥 Philosophie

**Double couche systématique** :
- **Fondamentaux** : Comprendre les principes intemporels
- **Pratique augmentée** : Exécuter 10x plus vite avec les meilleurs outils du moment

**Toujours à jour** : Le coach utilise la recherche web à chaque leçon pour vérifier les meilleures pratiques ACTUELLES. Jamais de méthode dépassée.

**Infini** : Pas de fin. Le parcours pousse toujours plus loin, adapte la difficulté en continu.

## ⚙️ Technique

- **React 18** via CDN (pas de build nécessaire)
- **Babel Standalone** pour transpiler le JSX dans le navigateur
- **Anthropic Claude API** avec web search
- **LocalStorage** pour persistance
- **PWA** avec Service Worker
- **CSS pur** avec animations keyframes (pas de libs)
- **Mobile-first**, optimisé tactile

## 🐛 Troubleshooting

**L'app ne s'installe pas sur iOS** :
- Assure-toi d'utiliser Safari (pas Chrome)
- Vérifie que tu es en HTTPS ou localhost
- Recharge la page et réessaie

**L'API ne répond pas** :
- Vérifie ta clé API sur console.anthropic.com
- Vérifie que tu as des crédits
- Regarde la console navigateur (F12) pour les erreurs

**La progression ne se sauvegarde pas** :
- Vérifie que le localStorage n'est pas désactivé
- Ne navigue pas en mode privé
- Vérifie l'espace disque de ton appareil

**L'app est lente** :
- Vide le cache du navigateur
- Vérifie ta connexion internet
- Les réponses Claude peuvent prendre 5-10 secondes

## 📝 Notes

- **Coût** : ~$0.01-0.05 par session selon la longueur
- **Connexion** : Requise pour les leçons (IA), mais l'app se lance offline
- **Compatibilité** : iOS 13+, Android 5+, navigateurs modernes
- **Sécurité** : La clé API n'est jamais sauvegardée, entre-la à chaque session

## 🚀 Prochaines fonctionnalités (si tu veux les ajouter)

- Mémoriser la clé API de façon sécurisée (env variable côté serveur)
- Mode "hors-ligne" avec des leçons pré-chargées
- Système de badges/achievements
- Leaderboard (si multi-joueurs)
- Export PDF de ta progression
- Intégration Notion/Obsidian pour prendre des notes

## 🤝 Contribuer

C'est ton projet ! Modifie `EmpireCoach.jsx` comme tu veux :
- Ajoute des piliers
- Change les couleurs, animations
- Modifie le system prompt de l'IA
- Personnalise le système de gamification

Le fichier fait 1000+ lignes mais tout est commenté et organisé.

---

**Construis ton empire. Sans limite.** 💰

Créé par Cash pour Lilian • Mars 2026
