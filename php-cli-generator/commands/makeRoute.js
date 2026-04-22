import path from 'path';
import chalk from 'chalk';
import templateService from '../services/templateService.js';
import fileService from '../services/fileService.js';
import fs from 'fs-extra';

export async function makeRoute(method, url, action) {
  const routesPath = path.join(process.cwd(), 'routes', 'web.php');
  
  if (!await fs.pathExists(routesPath)) {
    console.log(chalk.red("✖ Fichier routes/web.php introuvable. Lancez 'init' d'abord."));
    return;
  }

  const routeContent = await templateService.render('route/route.stub', {
    method: method.toLowerCase(),
    url: url,
    action: action
  });

  await fileService.appendToLine(routesPath, null, routeContent);
  console.log(chalk.green(`✔ Route ajoutée : ${method} ${url} -> ${action}`));

  // Analyser l'action pour vérifier/créer le controller
  const [controllerName, methodName] = action.split('@');
  if (controllerName) {
    const controllerPath = path.join(process.cwd(), 'app', 'controllers', `${controllerName}.php`);
    if (!await fs.pathExists(controllerPath)) {
      console.log(chalk.yellow(`⚠ Controller ${controllerName} manquant. Vous devriez le créer.`));
    }
  }
}
