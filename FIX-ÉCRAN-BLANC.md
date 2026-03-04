# 🔧 FIX ÉCRAN BLANC — Empire Coach

## ⚡ SOLUTION RAPIDE (99% des cas)

### **Le problème : CACHE DU NAVIGATEUR**

Ton navigateur a gardé l'ancienne version de l'app. Voici comment forcer le rechargement :

#### Sur ordinateur :
1. Ouvre l'app : `http://172.18.0.2:8000`
2. Appuie sur **Ctrl + Shift + R** (Windows/Linux) ou **Cmd + Shift + R** (Mac)
3. Ou : **Ctrl + F5** (force reload)

#### Sur mobile (iPhone/Android) :
1. **Ferme complètement le navigateur** (pas juste l'onglet, ferme l'app)
2. **Redémarre le téléphone** (oui, vraiment)
3. Rouvre Safari/Chrome
4. Va sur `http://[IP]:8000`

#### Si ça marche toujours pas :
**Navigation privée** (le cache est désactivé) :
- Chrome/Edge : Ctrl + Shift + N
- Firefox : Ctrl + Shift + P
- Safari : Cmd + Shift + N

---

## 🔍 DIAGNOSTIC (si la solution rapide ne marche pas)

### ÉTAPE 1 : Teste la version de test

Ouvre cette URL :
```
http://172.18.0.2:3000/index-test.html
```

**Ce que tu devrais voir :**
- Un écran noir avec du texte doré "✅ EMPIRE COACH FONCTIONNE !"
- Une liste de checks verts

**Si tu vois ça :**
→ ✅ Le problème vient du code de l'app, pas du setup
→ Passe à l'ÉTAPE 2

**Si tu ne vois rien ou erreur 404 :**
→ Le serveur de test n'est pas lancé
→ Lance :
```bash
cd /data/.openclaw/workspace/projects/empire-coach
npm run dev -- --port 3000 --host
```

---

### ÉTAPE 2 : Ouvre la console JavaScript

**Sur ordinateur :**
1. Appuie sur **F12** (ou Ctrl + Shift + I)
2. Clique sur l'onglet "Console"
3. Recharge la page (F5)
4. **Copie-colle TOUT ce qui apparaît** et envoie-le moi

**Sur mobile (Chrome Android) :**
1. Sur PC, va sur `chrome://inspect`
2. Connecte ton téléphone par USB
3. Active "Débogage USB" sur Android
4. Clique sur "Inspect" à côté de l'URL
5. Console s'ouvre → screenshot et envoie

**Sur mobile (iPhone Safari) :**
1. Sur Mac : Safari > Develop > [Ton iPhone] > [Page]
2. Console s'ouvre
3. Screenshot et envoie

---

### ÉTAPE 3 : Que chercher dans la console ?

#### ✅ Si tu vois des lignes vertes avec `[MAIN]` :
```
[MAIN] React importé: ...
[MAIN] ReactDOM importé: ...
[MAIN] ✅ React mounted successfully!
```
→ React fonctionne ! Le problème est dans le code de l'app.

#### ❌ Si tu vois des erreurs rouges :

**Type 1 : "Failed to fetch module" ou "404"**
```
GET http://172.18.0.2:8000/assets/index-xxx.js net::ERR_ABORTED 404
```
→ Le fichier JS n'existe pas ou mauvais chemin
→ **Solution :**
```bash
cd /data/.openclaw/workspace/projects/empire-coach
rm -rf dist
npm run build
python3 serve-prod.py
```

**Type 2 : "Cannot read property 'useState' of undefined"**
```
TypeError: Cannot read property 'useState' of undefined
```
→ React n'est pas chargé
→ **Solution :** Rebuild complet (voir Type 1)

**Type 3 : "Unexpected token '<'"**
```
Uncaught SyntaxError: Unexpected token '<'
```
→ Le serveur retourne du HTML au lieu du JS
→ **Solution :** Vérifie que le serveur serve bien `dist/`

**Type 4 : API Key error**
```
Error: Missing API key
```
→ Normal ! L'app démarre mais attend la clé API
→ **Pas un bug**, entre juste ta clé quand demandé

---

## 🛠️ SOLUTIONS PAR PROBLÈME

### Problème A : "Rien ne se passe, écran blanc, 0 erreur"

**Cause :** Cache navigateur têtu

**Solution :**
```bash
# 1. Vide le cache (dans le navigateur)
Settings > Privacy > Clear browsing data > Cached images and files

# 2. Redémarre le serveur
cd /data/.openclaw/workspace/empire-coach
pkill -f "python.*serve"
python3 serve-prod.py

# 3. Ouvre en navigation privée
```

---

### Problème B : "Erreurs 404 dans la console"

**Cause :** Build corrompu ou serveur pointe mal

**Solution :**
```bash
cd /data/.openclaw/workspace/projects/empire-coach

# Nettoie tout
rm -rf dist node_modules/.vite

# Rebuild propre
npm run build

# Vérifie que dist/ existe
ls -lh dist/assets/

# Lance le serveur
python3 serve-prod.py
```

---

### Problème C : "L'app charge mais crash immédiatement"

**Cause :** Erreur JavaScript dans le code

**Solution :** Envoie-moi la console complète et je corrige.

---

## 📱 TEST SUR MOBILE (après que ça marche sur PC)

1. **Trouve ton IP locale** :
```bash
ip addr show | grep "inet " | grep -v "127.0.0.1"
```

2. **Sur mobile, va sur** :
```
http://[TON-IP]:8000
```
Exemple : `http://192.168.1.100:8000`

3. **Si "Site inaccessible"** :
   - Vérifie que téléphone et PC sont sur le même Wi-Fi
   - Désactive le pare-feu sur PC (temporairement)
   - Relance avec `--host` :
   ```bash
   python3 serve-prod.py
   ```

---

## 🚀 SI TOUT ÉCHOUE : Rebuild from scratch

```bash
cd /data/.openclaw/workspace/projects/empire-coach

# Sauvegarde
git stash

# Nettoie TOUT
rm -rf dist node_modules .vite

# Reinstalle
npm install

# Rebuild
npm run build

# Vérifie le build
ls -lh dist/
cat dist/index.html

# Lance
python3 serve-prod.py
```

---

## 📊 CHECKLIST DE DIAGNOSTIC

Coche au fur et à mesure :

- [ ] J'ai forcé le reload (Ctrl + Shift + R)
- [ ] J'ai testé en navigation privée
- [ ] J'ai ouvert la console (F12)
- [ ] J'ai testé index-test.html (port 3000)
- [ ] J'ai rebuild (`npm run build`)
- [ ] J'ai redémarré le serveur
- [ ] J'ai copié les erreurs de console
- [ ] J'ai testé sur un autre navigateur
- [ ] J'ai vidé le cache navigateur
- [ ] J'ai redémarré l'ordinateur/téléphone

**Si tu as coché tout ça et ça marche toujours pas :**
→ Envoie-moi un screenshot de la console + la sortie de :
```bash
cd /data/.openclaw/workspace/projects/empire-coach
ls -lh dist/
cat dist/index.html
curl -I http://localhost:8000
```

---

**💡 Dans 99% des cas, c'est juste le cache. Force reload = win.**
