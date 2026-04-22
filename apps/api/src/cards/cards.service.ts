import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const cards = await this.prisma.card.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        store: true,
        usedByUser: true,
        cardTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return serializeBigInt(cards);
  }

  async create(createCardDto: CreateCardDto) {
    const {
      name,
      storeId,
      businessDetail,
      memo,
      usedAt,
      usedByUserId,
      frontImageUrl,
      backImageUrl,
      tagIds,
    } = createCardDto;

    const card = await this.prisma.card.create({
      data: {
        name,
        storeId: BigInt(storeId),
        businessDetail: businessDetail ?? null,
        memo: memo ?? null,
        usedAt: new Date(usedAt),
        usedByUserId: BigInt(usedByUserId),
        frontImageUrl,
        backImageUrl: backImageUrl ?? null,
        cardTags: tagIds?.length
          ? {
              create: tagIds.map((tagId) => ({
                tagId: BigInt(tagId),
              })),
            }
          : undefined,
      },
      include: {
        store: true,
        usedByUser: true,
        cardTags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return serializeBigInt(card);
  }
}