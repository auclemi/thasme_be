import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { WpPagesModule } from './wp-pages/wp-pages.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 3, // limite globale
      },
    ]),
    ContactModule,
    WpPagesModule,
  ],
  providers: [
    AppController,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
  controllers: [AppController],
})
export class AppModule { }
