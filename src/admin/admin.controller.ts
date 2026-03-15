import { Controller, Get, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Controller('api/admin')
export class AdminController {

  constructor(private readonly config: ConfigService) {}

  @Get('logs')
  getLogs() {
    const logPath = this.config.getOrThrow<string>('LOG_FILE_PATH');
    return fs.readFileSync(logPath, 'utf8');
  }

  @Delete('logs')
  deleteLogs() {
    const logPath = this.config.getOrThrow<string>('LOG_FILE_PATH');
    fs.writeFileSync(logPath, '[]', 'utf8');
    return 'Log supprimé';
  }
}
