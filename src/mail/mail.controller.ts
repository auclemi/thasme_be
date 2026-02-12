// import { Body, Controller, Post } from '@nestjs/common';
// import { MailService } from './mail.service';
// import { Throttle } from '@nestjs/throttler';

// @Controller('contact')
// export class MailController {
//   constructor(private readonly mail: MailService) {}

//   @Post()
//   @Throttle({ default: { limit: 1, ttl: 60, }, })
//   async send(@Body() body: any) {
//     // console.log('ENV:', body);
//     const { name, email, message } = body;
//     await this.mail.sendContactMail(name, email, message);
//     return { status: 'ok' };
//   }
// }


import { Controller, Post, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactDto } from './dto/contact.dto';
import { MailService } from './mail.service';

@Controller('contact')
export class MailController {
  constructor(private readonly mail: MailService) {console.log('📬 MailController loaded');}

  
  @Throttle({
    default: {
      limit: 1,   // 1 requête max
      ttl: 60,    // par minute
    },
  })
  @Post()
  async send(@Body() body: ContactDto) {
    await this.mail.sendContactMail(body.name, body.email, body.message);
    return { status: 'ok' };
  }
}
