import chalk from 'chalk';
import { makeController } from './makeController.js';
import { makeModel } from './makeModel.js';
import { makeRoute } from './makeRoute.js';
import templateService from '../services/templateService.js';
import path from 'path';

export async function makeCrud(name) {
  const pluralName = name.toLowerCase() + 's';
  
  console.log(chalk.magenta(`🛠 Génération du CRUD pour ${name}...`));

  // 1. Model
  await makeModel(name);

  // 2. Controller
  await makeController(name);

  // 3. Routes
  await makeRoute('GET', `/${pluralName}`, `${name}Controller@index`);
  await makeRoute('GET', `/${pluralName}/{id}`, `${name}Controller@show`);
  await makeRoute('POST', `/${pluralName}`, `${name}Controller@store`);

  // 4. Views
  const viewPath = path.join(process.cwd(), 'app', 'views', pluralName, 'index.php');
  await templateService.generateFile(viewPath, 'view/index.stub', {
    name: name
  });

  console.log(chalk.magenta(`✅ CRUD ${name} terminé !`));
}
