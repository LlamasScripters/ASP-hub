# Configuration des Variables d'Environnement API

Ce projet utilise une variable d'environnement `VITE_API_BASE_URL` pour configurer l'URL de base de l'API selon l'environnement de déploiement.

## Fichiers de Configuration

- `.env` - Configuration par défaut
- `.env.local` - Développement local (priorité sur .env)
- `.env.mobile` - Configuration pour mobile/Capacitor
- `.env.production` - Configuration pour la production
- `.env.example` - Exemple des variables disponibles

## Scripts Disponibles

### Développement
- `npm run dev` - Mode développement par défaut
- `npm run dev:local` - Mode développement local explicite
- `npm run dev:mobile` - Mode développement pour mobile/Capacitor

### Build
- `npm run build` - Build par défaut
- `npm run build:mobile` - Build pour mobile/Capacitor
- `npm run build:production` - Build pour production

## Configuration par Environnement

### Développement Web Local
```bash
# .env
VITE_API_BASE_URL=http://localhost:8080
```

### Mobile/Capacitor - Émulateur Android
```bash
# .env
VITE_API_BASE_URL=http://10.0.2.2:8080
```

### Mobile/Capacitor - Device Physique (Réseau Local)
```bash
# .env
VITE_API_BASE_URL=http://192.168.1.101:8080
```

### Production
```bash
# .env.production
VITE_API_BASE_URL=https://api.production.com
```

## Usage

La variable est accessible via `import.meta.env.VITE_API_BASE_URL` et est automatiquement configurée dans:

- `src/lib/config.ts` - Configuration centralisée
- `src/lib/api.ts` - Client API principal
- Tous les clients API des features

## Changement Manuel

Pour changer l'URL de l'API, modifiez simplement le fichier `.env` :

```bash
# Ouvrez le fichier .env et modifiez la valeur
VITE_API_BASE_URL=http://votre-nouvelle-url:8080
```

Puis redémarrez le serveur de développement :

```bash
npm run dev
```

## Exemples d'URLs selon l'environnement

| Environnement | URL | Description |
|---------------|-----|-------------|
| Web local | `http://localhost:8080` | Serveur de développement local |
| Émulateur Android | `http://10.0.2.2:8080` | IP spéciale pour émulateur Android |
| Device iOS/Android | `http://192.168.1.100:8080` | IP de votre machine sur le réseau local |
| Serveur de dev | `https://dev-api.example.com` | Serveur de développement distant |
| Production | `https://api.production.com` | Serveur de production |
