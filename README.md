# Project Setup & Usage

## Pré-requis

- [nvm](https://github.com/nvm-sh/nvm) (ou [nvm-windows](https://github.com/coreybutler/nvm-windows)) pour gérer la version de Node.js
- [Node.js](https://nodejs.org/) (version 22.15.0, voir `.nvmrc`)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (**obligatoire** pour le développement)

## Démarrage du projet (mode recommandé)

Le projet doit être lancé via **Docker Compose** pour fonctionner correctement en développement (reverse proxy Nginx, BDD, etc.).

```bash
docker compose up --build
```

- Accès frontend (via Nginx) : http://localhost:8080
- Accès backend (API) : http://localhost:8080/api

**Après le premier démarrage, il faut lancer les migrations :**

```bash
docker compose exec server npm run db:migrate
```

## Installation manuelle (cas particulier)

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

### Démarrage manuel

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

## Scripts utiles

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
- **Commandes Drizzle (server)** :

    - Générer des migrations:
      ```bash
      docker compose exec server npm run db:generate
      ```
    - Lancer les migrations:
      ```bash
      docker compose exec server npm run db:migrate
      ```

    - Seed la base de données:
      ```sh
      cd server
      npm run db:seed
      ```

    - Reset la base de données:
      ```sh
      cd server
      npm run db:reset
      ```

    - Fresh (reset puis seed) la base de données:
      ```sh
      cd server
      npm run db:fresh
      ```

    - Lancer l'interface Drizzle Studio pour gérer la base de données depuis une UI:
      ```sh
      cd server
      npm run db:studio
      ```
      et ouvrir le lien fourni par la commande.

  
