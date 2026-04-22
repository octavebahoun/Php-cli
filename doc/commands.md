# Guide des Commandes 📖

Toutes les commandes sont accessibles via `npm run php-cli -- [commande]`.

## `init [nom_du_projet]`
Initialise la structure de base. Si aucun nom n'est fourni, utilise le dossier courant.
- Crée les dossiers MVC.
- Génère `config.json` avec les paramètres par défaut.
- Prépare `routes/web.php`.

## `make:controller <Nom>`
Génère une classe Controller dans `app/controllers/`.
- Ajoute automatiquement le suffixe `Controller` au fichier et à la classe.

## `make:model <Nom>`
Génère une classe de modèle dans `app/models/`.
- Définit automatiquement le nom de la table au pluriel (ex: `Product` -> `products`).

## `make:route <METHOD> <URL> <ACTION>`
Inscrit une route dans `routes/web.php`.
- **METHOD** : GET, POST, PUT, DELETE.
- **URL** : Le path (ex: `/api/users`).
- **ACTION** : Le mapping `Controller@methode`.
- *Note : Le service vérifie si le controller mentionné existe.*

## `make:crud <Entité>`
La commande la plus puissante. Elle exécute en une fois :
1. `make:model Entité`
2. `make:controller Entité`
3. Génère `app/views/entités/index.php`.
4. Enregistre les routes standards (index, show, store).

## `help`
Affiche l'aide intégrée et la liste exhaustive des arguments.
