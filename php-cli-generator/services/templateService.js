import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import chalk from 'chalk';

class TemplateService {
  constructor() {
    this.templateDir = path.join(process.cwd(), 'php-cli-generator', 'templates');
  }

  async render(templatePath, data) {
    const fullPath = path.join(this.templateDir, templatePath);
    
    if (!await fs.pathExists(fullPath)) {
      throw new Error(`Template non trouvé : ${templatePath}`);
    }

    const templateContent = await fs.readFile(fullPath, 'utf-8');
    return ejs.render(templateContent, data);
  }

  /**
   * Génère un fichier à partir d'un template si il n'existe pas déjà
   */
  async generateFile(targetPath, templateName, data, force = false) {
    if (await fs.pathExists(targetPath) && !force) {
      console.log(chalk.yellow(`⚠ Le fichier existe déjà : ${targetPath}. Utilisez --force pour écraser.`));
      return false;
    }

    const content = await this.render(templateName, data);
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, content);
    console.log(chalk.green(`✔ Fichier créé : ${targetPath}`));
    return true;
  }
}

export default new TemplateService();
