import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class WpPagesService {
  private wpPages: any[];

  constructor() {
    this.wpPages = this.loadJson('wp-allpages.json');
  }

  private loadJson(file: string) {
    try {
      const filePath = join(process.cwd(), 'data', file);
      const content = readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new InternalServerErrorException(`Impossible de charger ${file}`);
    }
  }

  
  getWpPages() {
    return this.wpPages;
  }
}
