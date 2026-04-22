import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagsDto } from './dto/search-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(searchTagsDto: SearchTagsDto) {
    const { tagName } = searchTagsDto;

    const tags = await this.prisma.tag.findMany({
      where: {
        deletedAt: null,
        ...(tagName && {
          tagName: {
            contains: tagName,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return serializeBigInt(tags);
  }

  async findOne(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const tag = await this.prisma.tag.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!tag) {
      throw new NotFoundException('タグが見つかりません');
    }

    return serializeBigInt(tag);
  }

  async create(createTagDto: CreateTagDto) {
    const { tagName } = createTagDto;

    const tag = await this.prisma.tag.create({
      data: {
        tagName,
      },
    });

    return serializeBigInt(tag);
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingTag = await this.prisma.tag.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingTag) {
      throw new NotFoundException('タグが見つかりません');
    }

    const { tagName } = updateTagDto;

    const tag = await this.prisma.tag.update({
      where: {
        id: BigInt(id),
      },
      data: {
        tagName,
      },
    });

    return serializeBigInt(tag);
  }

  async remove(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingTag = await this.prisma.tag.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingTag) {
      throw new NotFoundException('タグが見つかりません');
    }

    const tag = await this.prisma.tag.update({
      where: {
        id: BigInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return serializeBigInt(tag);
  }
}