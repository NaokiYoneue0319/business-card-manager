export class CreateCardDto {
  name: string;
  storeId: string;
  businessDetail?: string;
  memo?: string;
  usedAt: string;
  usedByUserIds: string[];
  frontImageUrl: string;
  backImageUrl?: string;
  tagIds?: string[];
}