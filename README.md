# ASP-hub

## Project Setup & Usage

### Pré-requis

- [nvm](https://github.com/nvm-sh/nvm) (ou [nvm-windows](https://github.com/coreybutler/nvm-windows)) pour gérer la version de Node.js
- [Node.js](https://nodejs.org/) (version 22.15.0, voir `.nvmrc`)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (**obligatoire** pour le développement)

### Démarrage du projet (mode recommandé)

Le projet doit être lancé via **Docker Compose** pour fonctionner correctement en développement (reverse proxy Nginx, BDD, etc.).

#### Premier démarrage

1. **Configurer les variables d'environnement :**
   ```bash
   cp server/.env.example server/.env
   # Éditer server/.env avec vos valeurs
   ```

2. **Démarrer le développement :**
   ```bash
   npm run dev
   ```

3. **Lancer les migrations :**
   ```bash
   npm run db:migrate
   ```

#### Démarrages suivants

```bash
# Commande principale de développement (avec watch mode)
npm run dev
```

**Points d'accès :**
- Frontend (via Nginx) : http://localhost:8080
- Backend (API) : http://localhost:8080/api
- Console MinIO : http://localhost:9001 (admin/password)

### Installation manuelle (cas particulier)

> ⚠️ Ce mode n'est à utiliser qu'en cas de besoin spécifique (débogage, développement isolé, etc.). L'accès au front ne se fera alors pas via Nginx.
>
> Il faudra tout de même lancer des bases de données pour pouvoir lancer le projet.

1. **Installe la bonne version de Node.js**
   ```bash
   nvm install
   nvm use
   ```
2. **Installe les dépendances à la racine (hooks, lint, etc.)**
   ```bash
   npm install
   ```
3. **Installe les dépendances du client et du serveur**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

#### Démarrage manuel

- **Lancer le serveur** :
  ```bash
  cd server
  npm run dev
  ```
- **Lancer le client** :
  ```bash
  cd client
  npm run dev
  ```

- **Accès** (hors Nginx) :
  - Frontend : http://localhost:5173
  - Backend : http://localhost:3000

### Scripts utiles

#### Développement

- **Démarrer le développement** :
  ```bash
  npm run dev
  ```

- **Logs des services** :
  ```bash
  npm run dev:logs
  ```

- **Redémarrage forcé** :
  ```bash
  npm run dev:build
  ```

- **Arrêter les services** :
  ```bash
  npm run dev:down
  ```

#### Code Quality

- **Lint** (racine, client, server) :
  ```bash
  npm run lint
  npm run lint:fix
  ```
- **Build client** :
  ```bash
  cd client
  npm run build
  ```
- **Build server** :
  ```bash
  cd server
  npm run build
  ```
- **Tests client** :
  ```bash
  cd client
  npm run test
  ```
#### Base de données

- **Lancer les migrations** :
  ```bash
  npm run db:migrate
  ```

- **Seed la base de données** :
  ```bash
  npm run db:seed
  ```

- **Reset la base de données** :
  ```bash
  npm run db:reset
  ```

- **Fresh (reset puis seed)** :
  ```bash
  npm run db:fresh
  ```

- **Drizzle Studio** :
  ```bash
  npm run db:studio
  ```

- **Générer des migrations** :
  ```bash
  docker compose -f compose.dev.yml exec server npm run db:generate
  ```

  
#### Tests serveur

```bash
# Aller dans le dossier server
cd server

# Lancer tous les tests
npm test

# Lancer une catégorie spécifique
node --test tests/unit/
node --test tests/functional/
node --test tests/interface/

# Lancer un fichier spécifique
npx tsx --test tests/unit/password.test.ts
```

#### Tests client

```bash
# Aller dans le dossier client
cd client

# Lancer tous les tests
npx playwright test
```

## Documentation

### Google Drive (autorisations nécessaires)

Lien du Drive contenant les documents du projet : https://drive.google.com/drive/folders/1ZqHodTuhoczDxv4GG3eN2YHtUHpXcVXY
