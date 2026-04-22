export class UpdateUserDto {
  password?: string;
  userName: string;
  role: 'ADMIN' | 'GENERAL';
  isActive: boolean;
}