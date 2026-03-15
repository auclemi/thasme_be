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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const config_1 = require("@nestjs/config");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let ContactService = class ContactService {
    constructor(config) {
        this.config = config;
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
    async sendContactMail(name, email, message) {
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
    saveMessageLog(entry) {
        const filePath = path.join(process.cwd(), this.config.getOrThrow('LOG_FILE_PATH'));
        console.log(`Saving log entry to ${filePath}`); // debug
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]', 'utf8');
        }
        const logs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        logs.push(entry);
        fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ContactService);
