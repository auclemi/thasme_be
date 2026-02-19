import { Controller, Post, Body } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactDto } from './dto/contact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly mail: ContactService) {
    // console.log('📬 ContactController loaded');
  }

  
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
