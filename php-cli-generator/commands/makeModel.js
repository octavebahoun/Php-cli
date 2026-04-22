import path from 'path';
import chalk from 'chalk';
import templateService from '../services/templateService.js';

export async function makeModel(name) {
  const fileName = `${name}.php`;
  const filePath = path.join(process.cwd(), 'app', 'models', fileName);

  await templateService.generateFile(filePath, 'model/model.stub', {
    name: name,
    tableName: name.toLowerCase() + 's',
    fillable: []
  });
}
