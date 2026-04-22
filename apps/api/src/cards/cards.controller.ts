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
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { SearchCardsDto } from './dto/search-cards.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async findAll(@Query() searchCardsDto: SearchCardsDto) {
    return await this.cardsService.findAll(searchCardsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cardsService.findOne(id);
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.create(createCardDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return await this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cardsService.remove(id);
  }
}