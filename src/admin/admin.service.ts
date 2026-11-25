import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminLoginDto } from './dto/admin-login.dto.js';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(dto: AdminLoginDto): Promise<Object> {
    console.log(dto);

    const adminUsername =
      this.configService.getOrThrow<string>('ADMIN_USERNAME');

    const adminPass = this.configService.getOrThrow<string>(
      'ADMIN_PASSWORD_HASH',
    );

    console.log(adminUsername);
    console.log(adminPass);

    const usernameIsValid = dto.username === adminUsername;

    const passwordIsValid = await bcrypt.compare(dto.password, adminPass);

    console.log({
      usernameIsValid,
      passwordIsValid,
      hashConfigured: Boolean(adminPass),
      hashLength: adminPass.length,
      hashLooksLikeBcrypt: /^\$2[aby]\$\d{2}\$/.test(adminPass),
    });

    if (!usernameIsValid || !passwordIsValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: 'admin',
      username: adminUsername,
      role: 'admin',
    };

    const accessToken = await this.jwt.signAsync(payload);

    return {
      access_token: accessToken,
      token_type: 'Bearer',
    };
  }
}
