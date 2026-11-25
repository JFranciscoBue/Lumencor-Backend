import { Controller, Post, Body } from '@nestjs/common';
import { ContactsService } from './contacts.service.js';
import { UniversalFormDto } from './dto/universal-form.dto.js';
import { VolunteerFormDto } from './dto/volunteer-form.dto.js';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('editorial')
  sendEditorialForm(@Body() UniversalFormDto: UniversalFormDto) {
    return this.contactsService.sendEditorialForm(UniversalFormDto);
  }

  @Post('media')
  sendMediaForm(@Body() UniversalFormDto: UniversalFormDto) {
    return this.contactsService.sendMediaForm(UniversalFormDto);
  }

  @Post('art')
  sendArtForm(@Body() UniversalFormDto: UniversalFormDto) {
    return this.contactsService.sendArtForm(UniversalFormDto);
  }

  @Post('volunteer')
  sendVolunteerForm(@Body() VolunteerFormDto: VolunteerFormDto) {
    return this.contactsService.sendVolunteerForm(VolunteerFormDto);
  }
}
