"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminBasicAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
// console.log('🔥 MIDDLEWARE CALLED');
let AdminBasicAuthMiddleware = class AdminBasicAuthMiddleware {
    use(req, res, next) {
        // console.log('🔥 USE CALLED', req.method, req.url);
        // throw new Error('TEST ERROR FROM MIDDLEWARE');
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Basic ')) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
            return res.status(401).send('Authentication required');
        }
        const base64 = auth.replace('Basic ', '');
        const [user, pass] = Buffer.from(base64, 'base64').toString().split(':');
        if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
            return res.status(401).send('Invalid credentials');
        }
        console.log('✅ Admin authenticated');
        next();
    }
};
exports.AdminBasicAuthMiddleware = AdminBasicAuthMiddleware;
exports.AdminBasicAuthMiddleware = AdminBasicAuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AdminBasicAuthMiddleware);
