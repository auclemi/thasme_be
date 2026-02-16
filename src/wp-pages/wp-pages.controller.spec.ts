import { Test, TestingModule } from '@nestjs/testing';
import { WpPagesController } from './wp-pages.controller';

describe('WpPagesController', () => {
  let controller: WpPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WpPagesController],
    }).compile();

    controller = module.get<WpPagesController>(WpPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
