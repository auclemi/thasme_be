import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ContentModule } from './content/content.module';
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
    MailModule,
    ContentModule,
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
