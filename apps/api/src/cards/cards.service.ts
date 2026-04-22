import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateCardDto } from './dto/create-card.dto';
import { SearchCardsDto } from './dto/search-cards.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(searchCardsDto: SearchCardsDto) {
    const { name, storeName, usedByUserName, usedYearMonth, tagName } =
      searchCardsDto;

    let usedAtFilter = {};

    if (usedYearMonth) {
      const [year, month] = usedYearMonth.split('-').map(Number);

      if (!year || !month || month < 1 || month > 12) {
        throw new BadRequestException(
          'usedYearMonthはYYYY-MM形式で指定してください',
        );
      }

      const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
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

    return {
      id: card.id.toString(),
      name: card.name,
      store: {
        id: card.store.id.toString(),
        storeName: card.store.storeName,
        prefecture: card.store.prefecture,
        area: card.store.area,
      },
      businessDetail: card.businessDetail,
      memo: card.memo,
      usedAt: card.usedAt,
      usedYearMonth: `${card.usedAt.getFullYear()}-${String(
        card.usedAt.getMonth() + 1,
      ).padStart(2, '0')}`,
      usedByUser: {
        id: card.usedByUser.id.toString(),
        userName: card.usedByUser.userName,
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

  async update(id: string, updateCardDto: UpdateCardDto) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingCard = await this.prisma.card.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingCard) {
      throw new NotFoundException('名刺が見つかりません');
    }

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
    } = updateCardDto;

    const card = await this.prisma.card.update({
      where: {
        id: BigInt(id),
      },
      data: {
        name,
        storeId: BigInt(storeId),
        businessDetail: businessDetail ?? null,
        memo: memo ?? null,
        usedAt: new Date(usedAt),
        usedByUserId: BigInt(usedByUserId),
        frontImageUrl,
        backImageUrl: backImageUrl ?? null,
        cardTags: {
          deleteMany: {},
          ...(tagIds?.length
            ? {
                create: tagIds.map((tagId) => ({
                  tagId: BigInt(tagId),
                })),
              }
            : {}),
        },
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

    async remove(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingCard = await this.prisma.card.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingCard) {
      throw new NotFoundException('名刺が見つかりません');
    }

    const card = await this.prisma.card.update({
      where: {
        id: BigInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return serializeBigInt(card);
  }
}