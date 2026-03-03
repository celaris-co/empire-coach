# 🚀 LAUNCH - Empire Coach

**Checklist de lancement en 10 minutes**

## ✅ Étape 1 : Génère les icônes (2 min)

```bash
cd /data/.openclaw/workspace/projects/empire-coach
python3 generate_icons.py
```

Résultat : `icon-192.png` et `icon-512.png` créés ✅

**Optionnel** : Remplace-les par des icônes custom (voir ICONS.md)

---

## ✅ Étape 2 : Lance le serveur (30 sec)

```bash
python3 serve.py
```

Tu verras :
```
🎮 EMPIRE COACH - Serveur Local
✅ Serveur démarré sur le port 8000
📱 Sur ton iPhone, ouvre Safari et va sur :
   http://192.168.1.X:8000
```

**Note l'URL** (ex: `http://192.168.1.47:8000`)

---

## ✅ Étape 3 : Installe sur iPhone (2 min)

### Sur ton iPhone :

1. **Ouvre Safari** (pas Chrome !)
2. **Entre l'URL** du serveur
3. **Attend le chargement** (3-5 sec)
4. **Appuie sur Partager** (bouton carré avec flèche vers le haut)
5. **Scroll down** dans le menu
6. **Appuie sur "Sur l'écran d'accueil"**
7. **Nomme l'app** : "Empire Coach"
8. **Appuie sur Ajouter**

L'icône apparaît sur ton écran d'accueil ! 🎉

---

## ✅ Étape 4 : Obtiens une clé API (3 min)

### Première fois uniquement :

1. Va sur **https://console.anthropic.com**
2. **Crée un compte** (email + mot de passe)
3. Confirme ton email
4. Tu reçois **$5 gratuits** (~100-500 sessions)
5. Va dans **"API Keys"**
6. **Clique "Create Key"**
7. **Copie la clé** (commence par `sk-ant-...`)
8. **Sauvegarde-la** quelque part (Notes, 1Password, etc.)

Tu auras besoin de cette clé à chaque session.

---

## ✅ Étape 5 : Lance l'app (1 min)

1. **Appuie sur l'icône** Empire Coach sur ton écran d'accueil
2. L'app se lance en plein écran (comme une app native)
3. **Appuie sur "COMMENCER"**
4. **Entre ta clé API** quand demandé
5. **Réponds aux questions** d'évaluation initiale
6. **C'est parti !** 🎮

---

## 🎮 Utilisation

### Navigation

- **Splash** → Lance le jeu
- **Map** → Navigue entre les 12 piliers (clique sur les nœuds débloqués)
- **Leçon** → Chat avec le coach IA
- **Stats** → Bouton en haut de la map

### Gamification

| Élément | Description |
|---------|-------------|
| **XP** | +50 base, +100 bonne réponse, +200 parfait |
| **Rangs** | Apprenti (0) → Marchand (1k) → Stratège (5k) → Magnat (15k) → Empereur (50k+) |
| **Gemmes** | 1 💎 par réponse parfaite (≥9/10) |
| **Streak** | 🔥 Bonus multiplicateur si tu reviens chaque jour |

### Contrôles

- **Tape** ta réponse dans la zone de texte
- **Enter** pour envoyer
- **Shift+Enter** pour retour à la ligne
- **Scroll** pour naviguer dans l'historique
- **Retour** depuis une leçon pour revenir à la map

---

## 🏆 Les 12 Piliers

Progression de 0 à 100% par pilier :

| # | Pilier | Focus |
|---|--------|-------|
| 0 | 🧠 **Mindset & Psychologie** | Mental de gagnant, résilience |
| 1 | 📊 **Comptabilité & Finance** | Fondamentaux + outils IA |
| 2 | 🌍 **Économie & Macro** | Cycles, marchés, analyse IA |
| 3 | ⚖️ **Droit des Affaires** | Structures juridiques + legaltech |
| 4 | 🚀 **Entrepreneuriat** | Créer, valider, lancer + IA |
| 5 | 📈 **Marketing & Growth** | Acquisition + AI marketing |
| 6 | 🤝 **Vente & Négociation** | Closer + automatisation |
| 7 | 👑 **Management & Leadership** | Teams humaines + hybrides IA |
| 8 | 💰 **Investissement** | Actions, immo, crypto + IA |
| 9 | ♟️ **Stratégie & Concurrence** | Positionnement + veille IA |
| 10 | 🏛️ **Holding & Architecture** | Structurer un groupe |
| 11 | 🔱 **Influence & Pouvoir** | Personal branding + IA |

---

## 💡 Conseils Pro

### Pour progresser vite

- ✅ **Réponds honnêtement** aux questions (l'IA adapte le niveau)
- ✅ **Reviens chaque jour** (streak = bonus XP)
- ✅ **Prends des notes** (l'app ne les sauvegarde pas encore)
- ✅ **Demande des cas pratiques** si tu veux appliquer

### Pour optimiser les coûts

- 💰 **Sessions courtes** = ~$0.01
- 💰 **Sessions longues** = ~$0.03-0.05
- 💰 **$5 = 100-500 sessions** selon la longueur
- 💰 **Recharge** sur console.anthropic.com si besoin

### Pour une meilleure expérience

- 📱 **Active "Ne pas déranger"** pendant les sessions
- 📱 **Charge ton téléphone** (l'app peut consommer de la batterie)
- 📱 **Connexion stable** (Wi-Fi recommandé)
- 📱 **Mode portrait** recommandé (l'UI est optimisée pour)

---

## 🐛 Dépannage

### L'app ne s'installe pas

- ❌ Tu utilises Chrome → **utilise Safari**
- ❌ Le serveur est éteint → **relance `python3 serve.py`**
- ❌ Tu n'es pas sur le même réseau → **vérifie le Wi-Fi**

### L'API ne répond pas

- ❌ Mauvaise clé → **vérifie sur console.anthropic.com**
- ❌ Plus de crédits → **recharge ton compte**
- ❌ Erreur réseau → **vérifie ta connexion**

### L'app est lente

- ❌ Connexion faible → **passe en Wi-Fi**
- ❌ Cache plein → **vide le cache Safari**
- ❌ L'IA réfléchit → **normal, attend 5-10 sec**

### La progression ne se sauvegarde pas

- ❌ Mode privé → **utilise un onglet normal**
- ❌ Cache désactivé → **active-le dans Réglages**
- ❌ Pas d'espace → **libère de l'espace sur l'iPhone**

---

## 📊 Monitoring

### Vérifier l'utilisation API

1. Va sur https://console.anthropic.com
2. **Dashboard** → "Usage"
3. Tu vois :
   - Tokens consommés
   - Coût estimé
   - Crédits restants

### Vérifier la progression

Dans l'app, ouvre le panneau **Stats** :
- XP total
- Rang actuel
- Progression par pilier
- Forces / Faiblesses
- Prochaine étape

---

## 🚀 Prochaines étapes

### Après les premières sessions

- [ ] Note tes apprentissages clés dans Notion/Obsidian
- [ ] Applique 1 conseil par jour
- [ ] Reviens chaque jour pour le streak bonus
- [ ] Débloque tous les piliers (objectif à 30 jours)

### Quand tu maîtrises l'app

- [ ] Personnalise le system prompt dans `EmpireCoach.jsx`
- [ ] Ajoute des piliers custom
- [ ] Change les couleurs / animations
- [ ] Héberge sur Vercel pour y accéder partout

### Pour aller plus loin

- [ ] Intègre un système de notes
- [ ] Ajoute des achievements custom
- [ ] Crée un leaderboard si multi-joueurs
- [ ] Export PDF de ta progression

---

## 📂 Fichiers

```
empire-coach/
├── EmpireCoach.jsx          # 🎯 L'app complète (1000+ lignes)
├── index.html               # Point d'entrée
├── manifest.json            # Config PWA
├── sw.js                    # Service Worker
├── serve.py                 # 🚀 Lance le serveur
├── generate_icons.py        # 🎨 Génère les icônes
├── icon-192.png             # Icône 192×192
├── icon-512.png             # Icône 512×512
├── icon-template.svg        # Template SVG
├── README.md                # Doc complète
├── QUICKSTART.md            # Installation rapide
├── LAUNCH.md                # 👈 TU ES ICI
└── ICONS.md                 # Guide icônes
```

---

## ✨ C'est parti !

Tu as maintenant **tout** ce qu'il faut pour :

1. ✅ **Installer** l'app sur iOS
2. ✅ **Lancer** ta première session
3. ✅ **Progresser** dans les 12 piliers
4. ✅ **Construire** ton empire

**Objectif à 90 jours** : Rang Empereur (50k+ XP) = maîtrise complète.

---

**Construis ton empire. Sans limite.** 💰

*Créé par Cash pour Lilian • Mars 2026*
