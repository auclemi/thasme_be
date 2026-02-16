import { Module } from '@nestjs/common';
import { WpPagesController } from './wp-pages.controller';
import { WpPagesService } from './wp-pages.service';

@Module({
  controllers: [WpPagesController],
  providers: [WpPagesService],
  exports: [WpPagesService],
})
export class WpPagesModule {}
