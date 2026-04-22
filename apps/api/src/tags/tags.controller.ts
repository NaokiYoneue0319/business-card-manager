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
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagsDto } from './dto/search-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll(@Query() searchTagsDto: SearchTagsDto) {
    return await this.tagsService.findAll(searchTagsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tagsService.findOne(id);
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.tagsService.remove(id);
  }
}