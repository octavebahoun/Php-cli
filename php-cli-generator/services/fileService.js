import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

class FileService {
  /**
   * Ajoute une ligne à un fichier de manière intelligente
   */
  async appendToLine(filePath, searchPattern, newLine) {
    if (!await fs.pathExists(filePath)) {
      console.log(chalk.red(`✖ Fichier non trouvé : ${filePath}`));
      return false;
    }

    let content = await fs.readFile(filePath, 'utf-8');
    
    // Éviter les doublons
    if (content.includes(newLine.trim())) {
      console.log(chalk.yellow(`⚠ La ligne existe déjà dans ${filePath}`));
      return false;
    }

    if (searchPattern) {
      content = content.replace(searchPattern, (match) => `${match}\n${newLine}`);
    } else {
      content += `\n${newLine}`;
    }

    await fs.writeFile(filePath, content);
    return true;
  }

  async ensureDirectoryStructure(baseDir, structure) {
    for (const dir of structure) {
      await fs.ensureDir(path.join(baseDir, dir));
    }
  }
}

export default new FileService();
