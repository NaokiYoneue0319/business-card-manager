import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateCardDto } from './dto/create-card.dto';
import { SearchCardsDto } from './dto/search-cards.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(searchCardsDto: SearchCardsDto) {
    const { name, storeName, usedByUserName, usedYearMonth, tagName } = searchCardsDto;

    let usedAtFilter = {};

    if (usedYearMonth) {
      const [year, month] = usedYearMonth.split('-').map(Number);

      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59, 999);

      usedAtFilter = {
        usedAt: {
          gte: start,
          lte: end,
        },
      };
    }

    const cards = await this.prisma.card.findMany({
      where: {
        deletedAt: null,

        ...(name && {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        }),

        ...(storeName && {
          store: {
            storeName: {
              contains: storeName,
              mode: 'insensitive',
            },
          },
        }),

        ...(usedByUserName && {
          usedByUser: {
            userName: {
              contains: usedByUserName,
              mode: 'insensitive',
            },
          },
        }),

        ...usedAtFilter,

        ...(tagName && {
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
        }),
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

  async findOne(id: string) {
  if (!/^\d+$/.test(id)) {
    throw new BadRequestException('idは数値で指定してください');
  }

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

  // 🔥 ここで整形する
  const response = {
    id: card.id.toString(),
    name: card.name,

    store: {
      id: card.store?.id.toString(),
      storeName: card.store?.storeName,
      prefecture: card.store?.prefecture,
      area: card.store?.area,
    },

    businessDetail: card.businessDetail,
    memo: card.memo,

    usedAt: card.usedAt,
    usedYearMonth: `${card.usedAt.getFullYear()}-${String(
      card.usedAt.getMonth() + 1,
    ).padStart(2, '0')}`,

    usedByUser: {
      id: card.usedByUser?.id.toString(),
      userName: card.usedByUser?.userName,
    },

    images: {
      front: card.frontImageUrl,
      back: card.backImageUrl,
    },

    tags: card.cardTags.map((ct) => ({
      id: ct.tag.id.toString(),
      tagName: ct.tag.tagName,
    })),
  };

  return response;
  }
}