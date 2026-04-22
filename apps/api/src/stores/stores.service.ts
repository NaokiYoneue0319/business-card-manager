import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/utils/serialize-bigint';
import { CreateStoreDto } from './dto/create-store.dto';
import { SearchStoresDto } from './dto/search-stores.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(searchStoresDto: SearchStoresDto) {
    const { storeName, prefecture, area } = searchStoresDto;

    const stores = await this.prisma.store.findMany({
      where: {
        deletedAt: null,

        ...(storeName && {
          storeName: {
            contains: storeName,
            mode: 'insensitive',
          },
        }),

        ...(prefecture && {
          prefecture: {
            equals: prefecture,
            mode: 'insensitive',
          },
        }),

        ...(area && {
          area: {
            contains: area,
            mode: 'insensitive',
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return serializeBigInt(stores);
  }

  async findOne(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const store = await this.prisma.store.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!store) {
      throw new NotFoundException('店舗が見つかりません');
    }

    return serializeBigInt(store);
  }

  async create(createStoreDto: CreateStoreDto) {
    const { storeName, prefecture, area } = createStoreDto;

    const store = await this.prisma.store.create({
      data: {
        storeName,
        prefecture,
        area,
      },
    });

    return serializeBigInt(store);
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingStore = await this.prisma.store.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingStore) {
      throw new NotFoundException('店舗が見つかりません');
    }

    const { storeName, prefecture, area } = updateStoreDto;

    const store = await this.prisma.store.update({
      where: {
        id: BigInt(id),
      },
      data: {
        storeName,
        prefecture,
        area,
      },
    });

    return serializeBigInt(store);
  }

  async remove(id: string) {
    if (!/^\d+$/.test(id)) {
      throw new BadRequestException('idは数値で指定してください');
    }

    const existingStore = await this.prisma.store.findFirst({
      where: {
        id: BigInt(id),
        deletedAt: null,
      },
    });

    if (!existingStore) {
      throw new NotFoundException('店舗が見つかりません');
    }

    const store = await this.prisma.store.update({
      where: {
        id: BigInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return serializeBigInt(store);
  }
}