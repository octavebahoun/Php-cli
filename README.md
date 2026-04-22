# PHP MVC CLI Generator 🚀

Un générateur de ligne de commande (CLI) puissant écrit en Node.js pour automatiser l'échafaudage de projets PHP suivant l'architecture MVC.

## 🌟 Caractéristiques

- **MVC Ready** : Génère une structure complète (`app`, `config`, `routes`, `public`).
- **CRUD Automatique** : Crée Modèle, Controller, Routes et Vues en une seule commande.
- **Routes Intelligentes** : Injection automatique dans le fichier de routes avec vérification de l'existence des controllers.
- **Moteur de Templates** : Utilise des fichiers `.stub` personnalisables pour le code généré.
- **Tableau de Bord** : Interface web intégrée pour simuler et visualiser les changements.

## 🛠 Installation

```bash
# Installer les dépendances
npm install

# Lancer le simulateur (Dashboard)
npm run dev
```

## 💻 Utilisation de la CLI

Le générateur peut être utilisé directement via npm :

```bash
# Initialiser un nouveau projet
npm run php-cli -- init mon-projet

# Créer un controller
npm run php-cli -- make:controller Auth

# Créer un modèle
npm run php-cli -- make:model Product

# Générer un CRUD complet pour une entité
npm run php-cli -- make:crud Article
```

## 📂 Documentation détaillée

Vous trouverez plus d'informations dans le dossier `/doc` :

- [Architecture du projet](./doc/architecture.md)
- [Guide des commandes](./doc/commands.md)
- [Personnalisation des templates](./doc/templates.md)

## 🎨 Design

L'interface de simulation utilise le thème **Geometric Balance**, offrant une esthétique moderne et technique basée sur Tailwind CSS.
