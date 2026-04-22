export class UpdateCardDto {
  name: string;
  storeId: string;
  businessDetail?: string;
  memo?: string;
  usedAt: string;
  usedByUserId: string;
  frontImageUrl: string;
  backImageUrl?: string;
  tagIds?: string[];
}