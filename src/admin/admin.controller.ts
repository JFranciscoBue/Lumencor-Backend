import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AdminLoginDto } from './dto/admin-login.dto.js';
import { AdminGuard } from './guards/admin.guard.js';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('verify')
  @UseGuards(AdminGuard)
  async verify() {
    return 'TODO BIEN';
  }

  @Post('login')
  async login(@Body() dto: AdminLoginDto) {
    return await this.adminService.login(dto);
  }
}
