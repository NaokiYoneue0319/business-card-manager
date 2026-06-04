import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  @Post('cards')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/cards',
        filename: (_req, file, callback) => {
          const ext = extname(file.originalname);
          callback(null, `${randomUUID()}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const ext = extname(file.originalname).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
        callback(new BadRequestException('画像ファイルを指定してください'), false);
        return;
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadCardImage(@UploadedFile() file: Express.Multer.File) {
    console.log('file=', file);
    if (!file) {
      throw new BadRequestException('ファイルが指定されていません');
    }

    return {
      imageUrl: `/uploads/cards/${file.filename}`,
    };
  }
}