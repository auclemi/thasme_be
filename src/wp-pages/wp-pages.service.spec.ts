import { Test, TestingModule } from '@nestjs/testing';
import { WpPagesService } from './wp-pages.service';

describe('WpPagesService', () => {
  let service: WpPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WpPagesService],
    }).compile();

    service = module.get<WpPagesService>(WpPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
