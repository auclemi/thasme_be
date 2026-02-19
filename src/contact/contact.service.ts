import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ContactService {
  private transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.getOrThrow('SMTP_HOST'),
      port: this.config.getOrThrow('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.config.getOrThrow('SMTP_USER'),
        pass: this.config.getOrThrow('SMTP_PASS'),
      },
    });
  }

  async sendContactMail(name: string, email: string, message: string) {
    const logEntry = { name, email, message, date: new Date().toISOString(), };
    this.saveMessageLog(logEntry);
    return this.transporter.sendMail({
      from: `"That's Me" <${this.config.getOrThrow('CONTACT_FROM')}>`,
      to: this.config.getOrThrow('CONTACT_TO'),
      subject: `${this.config.getOrThrow('SITE_NAME')} (${this.config.getOrThrow('ENVIRONMENT')}) - Message de ${name}`,
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #444;">Nouveau message depuis ${this.config.getOrThrow('SITE_NAME')} (${this.config.getOrThrow('ENVIRONMENT')})</h2>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>

        <div style="margin-top: 20px; padding: 15px; background: #f7f7f7; border-left: 4px solid #4a90e2;">
          <p style="white-space: pre-line;">${message}</p>
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #777;">
          Message envoyé automatiquement depuis ton site.
        </p>
      </div>
    `,
    
    });
    
  }

  private saveMessageLog(entry: any) {
    const filePath = path.join(process.cwd(), this.config.getOrThrow('LOG_FILE_PATH'));
    console.log(`Saving log entry to ${filePath}`); // debug
    if (!fs.existsSync(filePath)) {
       fs.writeFileSync(filePath, '[]', 'utf8'); 
    }

    const logs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    logs.push(entry);
    fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
  }
}
