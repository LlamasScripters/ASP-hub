## Capacitor Mobile App

Cette application mobile utilise Capacitor et Vite.

### Prérequis
- Node.js (>=16) et npm  
- Android Studio (pour la plateforme Android)  
- macOS & Xcode (pour la plateforme iOS)  
- Capacitor CLI (global) : `npm install -g @capacitor/cli`

### Installation
```bash
cd client/my-app
npm install
npx cap sync
```

### Lancement

- **Web (développement avec Vite)**  
  ```bash
  npm start
  ```

#### Android
```bash
npx cap open android
# Ouvre Android Studio : build et run depuis l'IDE
```

ou directement en ligne de commande :
```bash
npx cap run android -l --external
```

> Le fichier `android/local.properties` (chemin SDK) n'est pas versionné ; Android Studio le crée automatiquement.

#### iOS
```bash
npx cap open ios
# Ouvre Xcode : build et run depuis l'IDE
```

ou directement :
```bash
npx cap run ios -l --external
```
