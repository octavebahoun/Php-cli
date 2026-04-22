# Architecture Technique 🏗️

Le PHP MVC CLI Generator est conçu de manière modulaire pour séparer la logique de commande du rendu de code.

## Structure des fichiers du générateur

```text
/php-cli-generator
  /bin
    cli.js            # Point d'entrée principal (Commander.js)
  /commands
    init.js           # Logique d'initialisation de projet
    makeController.js # Génération de controllers
    makeCrud.js       # Orchestration du CRUD (appel les autres commandes)
    ...
  /services
    fileService.js    # Manipulation du système de fichiers (fs-extra)
    templateService.js # Rendu des .stub via EJS
  /templates          # Fichiers .stub servant de base
  config.json         # Configuration globale persistée
```

## Flux de données

1. **Input** : L'utilisateur entre une commande via `cli.js` ou le Dashboard.
2. **Command** : La fonction de commande correspondante est appelée.
3. **Template Service** : Cherche le fichier `.stub` approprié dans `/templates`.
4. **Processing** : Injecte les variables (nom de classe, table, etc.) via EJS.
5. **Output** : Le `fileService` écrit le fichier final dans l'arborescence du projet PHP.

## Structure du projet PHP généré

Le générateur impose une structure MVC propre :
- `app/controllers` : Logique applicative.
- `app/models` : Interaction base de données.
- `app/views` : Templates HTML (PHP natif).
- `routes/web.php` : Définition de toutes les URLs.
- `config/` : Paramètres de base de données et application.
