import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import fileService from '../services/fileService.js';

export async function init(projectName = '.') {
  const baseDir = path.join(process.cwd(), projectName);
  
  const structure = [
    'app/controllers',
    'app/models',
    'app/views',
    'config',
    'routes',
    'public'
  ];

  console.log(chalk.blue(`🚀 Initialisation du projet dans ${baseDir}...`));

  await fileService.ensureDirectoryStructure(baseDir, structure);

  // Créer un fichier de config par défaut
  const config = {
    name: projectName === '.' ? path.basename(process.cwd()) : projectName,
    database: {
      driver: 'mysql',
      host: 'localhost',
      database: 'my_db'
    }
  };

  await fs.writeJSON(path.join(baseDir, 'config.json'), config, { spaces: 2 });
  
  // Créer routes.php par défaut
  const routesPath = path.join(baseDir, 'routes', 'web.php');
  if (!await fs.pathExists(routesPath)) {
    await fs.writeFile(routesPath, "<?php\n\n$router = new Router();\n\n");
  }

  console.log(chalk.green(`✨ Projet initialisé avec succès !`));
}
