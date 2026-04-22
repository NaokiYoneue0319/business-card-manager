import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateStoreDto } from './dto/create-store.dto';
import { SearchStoresDto } from './dto/search-stores.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(@Query() searchStoresDto: SearchStoresDto) {
    return await this.storesService.findAll(searchStoresDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.storesService.findOne(id);
  }

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    return await this.storesService.create(createStoreDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return await this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.storesService.remove(id);
  }
}