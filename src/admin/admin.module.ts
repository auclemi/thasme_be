import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminBasicAuthMiddleware } from './basic-auth.middleware';

@Module({
  controllers: [AdminController],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminBasicAuthMiddleware)
      .forRoutes(AdminController);
  }
}
