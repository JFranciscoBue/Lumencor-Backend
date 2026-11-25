import { Injectable } from '@nestjs/common';
import { UniversalFormDto } from './dto/universal-form.dto.js';
import { VolunteerFormDto } from './dto/volunteer-form.dto.js';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class ContactsService {
  private readonly transporter: Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('MAIL_HOST'),
      port: Number(this.configService.getOrThrow<string>('MAIL_PORT')),
      secure: this.configService.get<string>('MAIL_SECURE') === 'true',
      requireTLS: true,
      auth: {
        user: this.configService.getOrThrow<string>('MAIL_USER'),
        pass: this.configService.getOrThrow<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEditorialForm(dto: UniversalFormDto): Promise<Object> {
    try {
      await this.sendContactEmail('Editorial', dto);
    } catch (e) {
      console.error(e);
    }

    return {
      message: 'Formulario validado y procesado correctamente',
    };
  }

  async sendMediaForm(dto: UniversalFormDto) {
    try {
      await this.sendContactEmail('Medios', dto);
    } catch (e) {
      console.error(e);
    }

    return {
      message: 'Formulario validado y procesado correctamente',
    };
  }

  async sendArtForm(dto: UniversalFormDto) {
    try {
      await this.sendContactEmail('Arte', dto);
    } catch (e) {
      console.error(e);
    }

    return {
      message: 'Formulario validado y procesado correctamente',
    };
  }

  async sendVolunteerForm(dto: VolunteerFormDto) {
    try {
      await this.sendContactEmail('Voluntariado', dto, dto.availability);
    } catch (e) {
      console.error(e);
    }

    return {
      message: 'Formulario validado y procesado correctamente',
    };
  }

  private async sendContactEmail(
    section: string,
    dto: UniversalFormDto,
    availability?: string,
  ): Promise<void> {
    await this.transporter.sendMail({
      from: {
        name: 'LumenCor',
        address: this.configService.getOrThrow<string>('MAIL_FROM'),
      },

      to: this.configService.getOrThrow<string>('MAIL_TO'),

      replyTo: {
        name: dto.name,
        address: dto.email,
      },

      subject: `Nueva consulta - ${section}`,

      text: `
Nueva consulta recibida desde la sección: ${section}

DATOS DEL USUARIO

Nombre: ${dto.name}
Email: ${dto.email}
Teléfono: ${dto.phone}
Profesión: ${dto.profession}
Disponibilidad: ${availability ?? '-'}

CONSULTA:

${dto.consultation}
    `,
    });
  }
}
