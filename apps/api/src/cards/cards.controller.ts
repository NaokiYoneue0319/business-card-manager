import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { SearchCardsDto } from './dto/search-cards.dto';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async findAll(@Query() searchCardsDto: SearchCardsDto) {
    return await this.cardsService.findAll(searchCardsDto);
  }

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return await this.cardsService.create(createCardDto);
  }
}