import { Injectable, NestMiddleware } from '@nestjs/common';
// console.log('🔥 MIDDLEWARE CALLED');
@Injectable()
export class AdminBasicAuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
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
}
