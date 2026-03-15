import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

import * as express from 'express';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors(
    { origin: 'http://localhost:4200', 
      methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS', 
      credentials: true, }
    );
      // Dossier contenant le build Angular
  const clientPath = join(__dirname, '..', 'angular', 'browser');
  console.log('clientPath', clientPath);
 
  app.use(express.static(clientPath, {
  maxAge: '1y',
  etag: true,
}));
const expressApp = app.getHttpAdapter().getInstance();
  // toutes les routes non-API renvoient index.html
  
  // expressApp.get(/^[^.]*$/, (req: Request, res: Response) => {
  expressApp.get(/!(^\/api\/)/, (req: Request, res: Response) => {
    res.sendFile(join(clientPath, 'index.html'));
  });
  await app.listen(process.env.PORT ?? 80)
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import express from 'express';
// import { join } from 'path';

// async function bootstrap() {
//   const server = express();

//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(server),
//   );

//   const clientPath = join(__dirname, '..', 'client');

//   // ⚠️ IMPORTANT : on initialise Nest AVANT d'ajouter les routes Express
//   await app.init();

//   server.use(express.static(clientPath));

//   server.get('*', (req, res) => {
//     if (!req.url.startsWith('/api')) {
//       res.sendFile(join(clientPath, 'index.html'));
//     }
//   });

//   server.listen(process.env.PORT || 80);
// }

// bootstrap();
