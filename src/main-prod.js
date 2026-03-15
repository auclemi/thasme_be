"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const express = __importStar(require("express"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.enableCors({ origin: 'http://localhost:4200',
        methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        credentials: true, });
    // Dossier contenant le build Angular
    const clientPath = (0, path_1.join)(__dirname, '..', 'angular', 'browser');
    app.use(express.static(clientPath, {
        maxAge: '1y',
        etag: true,
    }));
    // toutes les routes non-API renvoient index.html
    app.get(/^[^.]*$/, (req, res) => {
        res.sendFile((0, path_1.join)(clientPath, 'index.html'));
    });
    await app.listen(process.env.PORT ?? 80);
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
