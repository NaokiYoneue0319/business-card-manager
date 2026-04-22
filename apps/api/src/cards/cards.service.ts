import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateCardDto } from './dto/create-card.dto';
import { SearchCardsDto } from './dto/search-cards.dto';


@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(searchCardsDto: SearchCardsDto) {
  const { name, storeName, usedByUserName, usedAt, tagName } = searchCardsDto;

  const cards = await this.prisma.card.findMany({
    where: {
      deletedAt: null,

      ...(name
        ? {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          }
        : {}),

      ...(storeName
        ? {
            store: {
              storeName: {
                contains: storeName,
                mode: 'insensitive',
              },
            },
          }
        : {}),

      ...(usedByUserName
        ? {
            usedByUser: {
              userName: {
                contains: usedByUserName,
                mode: 'insensitive',
              },
            },
          }
        : {}),

      ...(usedAt
        ? {
            usedAt: new Date(usedAt),
          }
        : {}),

      ...(tagName
        ? {
            cardTags: {
              some: {
                tag: {
                  tagName: {
                    contains: tagName,
                    mode: 'insensitive',
                  },
                },
              },
            },
          }
        : {}),
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

  async findOne(id: string) {
    const card = await this.prisma.card.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
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

    if (!card) {
      throw new NotFoundException('名刺が見つかりません');
    }

    return serializeBigInt(card);
  }
}