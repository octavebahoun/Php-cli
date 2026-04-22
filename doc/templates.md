# Personnalisation des Templates 🧩

La CLI utilise des fichiers `.stub` comme base de génération. Ils se situent dans `/php-cli-generator/templates`.

## Utilisation des variables
Nous utilisons **EJS** pour injecter des données dynamiques dans les stubs.

Exemple pour un modèle (`model.stub`) :
```php
class <%- name %> {
    protected $table = '<%- tableName %>';
}
```

## Variables disponibles par défaut :
- `name` : Le nom fourni par l'utilisateur (ex: User).
- `tableName` : Le nom de la table déduit (ex: users).
- `fillable` : Tableau des champs autorisés (utilisé dans les CRUDs avancés).

## Comment ajouter votre propre template ?
1. Créez un dossier dans `/templates` (ex: `/templates/service`).
2. Ajoutez un fichier `service.stub`.
3. Créez une commande correspondante dans `/commands/makeService.js`.
4. Enregistrez la commande dans `bin/cli.js`.

Cela permet à la CLI d'évoluer avec les besoins spécifiques de votre équipe ou de vos projets.
