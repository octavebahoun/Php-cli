import path from 'path';
import chalk from 'chalk';
import templateService from '../services/templateService.js';

export async function makeController(name) {
  const fileName = `${name}Controller.php`;
  const filePath = path.join(process.cwd(), 'app', 'controllers', fileName);

  await templateService.generateFile(filePath, 'controller/controller.stub', {
    name: name
  });
}
