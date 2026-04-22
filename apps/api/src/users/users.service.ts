import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(searchUsersDto: SearchUsersDto) {
    const { userName, loginId, role, isActive } = searchUsersDto;

    const users = await this.prisma.user.findMany({
      where: {
        deletedAt: null,

        ...(userName && {
          userName: {
            contains: userName,
            mode: 'insensitive',
          },
        }),

        ...(loginId && {
          loginId: {
            contains: loginId,
            mode: 'insensitive',
          },
        }),

        ...(role && {
          role,
        }),

        ...(isActive !== undefined && {
          isActive: isActive === 'true',
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return serializeBigInt(users);
  }

  async findOne(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }

    return serializeBigInt(user);
  }

  async create(createUserDto: CreateUserDto) {
  const { loginId, password, userName, role, isActive } = createUserDto;

  const existingUser = await this.prisma.user.findFirst({
    where: {
      loginId,
      deletedAt: null,
    },
  });

  if (existingUser) {
    throw new BadRequestException('同じログインIDのユーザーが既に存在します');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.prisma.user.create({
    data: {
      loginId,
      passwordHash: hashedPassword, // ←変更
      userName,
      role,
      isActive,
    },
  });

  return serializeBigInt(user);
}

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('ユーザーが見つかりません');
    }

    const { password, userName, role, isActive } = updateUserDto;

    const user = await this.prisma.user.update({
      where: {
        id: BigInt(id),
      },
      data: {
        ...(password ? { passwordHash: password } : {}),
        userName,
        role,
        isActive,
      },
    });

    return serializeBigInt(user);
  }

  async remove(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingUser = await this.prisma.user.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingUser) {
      throw new NotFoundException('ユーザーが見つかりません');
    }

    const user = await this.prisma.user.update({
      where: {
        id: BigInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return serializeBigInt(user);
  }
}