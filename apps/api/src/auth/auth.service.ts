import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        loginId: loginDto.loginId,
        deletedAt: null,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('ログインIDまたはパスワードが正しくありません');
    }

    const isMatch = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );

    if (!isMatch) {
      throw new UnauthorizedException('ログインIDまたはパスワードが正しくありません');
    }

    const payload = {
      sub: user.id.toString(),
      loginId: user.loginId,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}