import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadsService {
  createCardImageFileName(originalName: string) {
    const ext = extname(originalName);
    return `${randomUUID()}${ext}`;
  }

  createCardImageUrl(fileName: string) {
    return `/uploads/cards/${fileName}`;
  }
}