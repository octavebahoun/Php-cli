#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { init } from '../commands/init.js';
import { makeController } from '../commands/makeController.js';
import { makeModel } from '../commands/makeModel.js';
import { makeRoute } from '../commands/makeRoute.js';
import { makeCrud } from '../commands/makeCrud.js';

const program = new Command();

program
  .name('php-cli')
  .description('Générateur MVC pour PHP')
  .version('1.0.0');

// Initialisation
program
  .command('init')
  .argument('[project]', 'Nom du projet', '.')
  .description('Initialise la structure MVC')
  .action(async (project) => {
    await init(project);
  });

// Génération Controller
program
  .command('make:controller')
  .argument('<name>', 'Nom du controller')
  .description('Génère un nouveau controller')
  .action(async (name) => {
    await makeController(name);
  });

// Génération Modèle
program
  .command('make:model')
  .argument('<name>', 'Nom du modèle')
  .description('Génère un nouveau modèle')
  .action(async (name) => {
    await makeModel(name);
  });

// Génération Route
program
  .command('make:route')
  .argument('<method>', 'Méthode HTTP (GET, POST, etc.)')
  .argument('<url>', 'URL de la route')
  .argument('<action>', 'Action (Controller@method)')
  .description('Ajoute une route intelligente')
  .action(async (method, url, action) => {
    await makeRoute(method, url, action);
  });

// Génération CRUD
program
  .command('make:crud')
  .argument('<name>', 'Nom de l\'entité pour le CRUD')
  .description('Génère le Model, Controller, Routes et Views pour une entité')
  .action(async (name) => {
    await makeCrud(name);
  });

// Mode interactif (si pas d'arguments)
if (!process.argv.slice(2).length) {
    console.log(chalk.cyan('👋 Bienvenue dans PHP-CLI Generator !'));
    inquirer.prompt([
        {
            type: 'list',
            name: 'command',
            message: 'Que voulez-vous faire ?',
            choices: [
                'Initialiser le projet',
                'Créer un Controller',
                'Créer un Modèle',
                'Créer un CRUD complet',
                'Quitter'
            ]
        }
    ]).then(async (answers) => {
        if (answers.command === 'Initialiser le projet') await init();
        if (answers.command === 'Créer un Controller') {
            const { name } = await inquirer.prompt([{ name: 'name', message: 'Nom du controller :' }]);
            await makeController(name);
        }
        if (answers.command === 'Créer un Modèle') {
            const { name } = await inquirer.prompt([{ name: 'name', message: 'Nom du modèle :' }]);
            await makeModel(name);
        }
        if (answers.command === 'Créer un CRUD complet') {
            const { name } = await inquirer.prompt([{ name: 'name', message: 'Nom de l\'entité :' }]);
            await makeCrud(name);
        }
    });
} else {
    program.parse(process.argv);
}
