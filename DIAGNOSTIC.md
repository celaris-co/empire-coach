# 🔍 DIAGNOSTIC - Écran blanc

## Problème rapporté
Écran tout blanc, rien ne se lance.

## Tests à effectuer

### 1. Accède à l'app
Ouvre dans ton navigateur (sur ton téléphone ou PC) :
```
http://172.18.0.2:8000
```

### 2. Ouvre la console JavaScript
**Sur ordinateur :**
- Chrome/Edge : F12 ou Ctrl+Shift+I
- Firefox : F12
- Safari : Cmd+Option+I (Mac)

**Sur mobile (Chrome Android) :**
1. Connecte ton téléphone à l'ordinateur par USB
2. Sur PC : Va sur `chrome://inspect`
3. Clique sur "Inspect" à côté de l'URL de ton téléphone

### 3. Que chercher dans la console ?

#### Si tu vois des erreurs rouges :
**Erreur de type :**
```
Failed to fetch module
```
→ Problème de chargement du JS

**Erreur de type :**
```
Cannot read property 'useState' of undefined
```
→ React n'est pas chargé correctement

**Erreur de type :**
```
CORS error
```
→ Problème de serveur

#### Si tu vois `[TEST] ✅` en vert :
→ Le serveur fonctionne, problème dans le code React

### 4. Test de diagnostic

Ouvre cette URL pour tester :
```
http://172.18.0.2:8000/test.html
```

**Ce que tu devrais voir :**
- "Test de chargement" en haut
- "✅ DOM accessible" en vert
- Dans la console : "[TEST] ✅ Module JS chargé avec succès"

**Si tu ne vois rien :**
→ Le serveur ne répond pas ou le navigateur ne charge pas la page

**Si tu vois "Test de chargement" mais pas le reste :**
→ Le JavaScript est bloqué ou le module ne se charge pas

### 5. Solutions potentielles

#### A) Le serveur ne répond pas
```bash
cd /data/.openclaw/workspace/projects/empire-coach
pkill -f "python.*serve-prod.py"
python3 serve-prod.py
```

#### B) Le build est cassé
```bash
cd /data/.openclaw/workspace/projects/empire-coach
rm -rf dist
npm run build
python3 serve-prod.py
```

#### C) Problème de navigation privée / cache
- Essaie en navigation privée
- Vide le cache (Ctrl+F5 sur PC, ou Settings > Clear cache sur mobile)
- Redémarre le navigateur

### 6. Copie-colle ce que tu vois

**Dans la console, copie-colle TOUTES les lignes** (erreurs + logs) et envoie-les moi.

**Fais aussi un screenshot** de la page + de la console.

---

## Causes probables (ordre de probabilité)

1. **Cache du navigateur** (60%)
   - Le navigateur a gardé l'ancienne version
   - Solution : Ctrl+F5 ou navigation privée

2. **JavaScript désactivé** (20%)
   - Rare mais possible sur certains navigateurs mobiles
   - Solution : Vérifier les paramètres du navigateur

3. **Erreur de chargement du module** (15%)
   - Le fichier JS est trop gros ou n'est pas chargé
   - Solution : Rebuild + vérifier la console

4. **API Anthropic bloque** (5%)
   - L'app attend une clé API et ne rend rien
   - Solution : Check la console, doit afficher un message

---

**📱 IMPORTANT : Teste d'abord sur ordinateur (plus facile pour déboguer), puis sur mobile une fois que ça marche.**
