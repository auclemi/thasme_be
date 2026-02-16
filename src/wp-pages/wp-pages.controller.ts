import { Controller, Get } from '@nestjs/common';
import { WpPagesService } from './wp-pages.service';

@Controller('wp-pages')
export class WpPagesController {
  constructor(private readonly content: WpPagesService) {}

  @Get()
  getWpPages() {
    return this.content.getWpPages();
  }
}
