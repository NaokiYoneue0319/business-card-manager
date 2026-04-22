import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,
    configService: ConfigService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: string; loginId: string; role: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: BigInt(payload.sub),
        deletedAt: null,
        isActive: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('無効なトークンです');
    }

    return {
      id: user.id.toString(),
      loginId: user.loginId,
      userName: user.userName,
      role: user.role,
    };
  }
}