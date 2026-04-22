export class CreateUserDto {
  loginId: string;
  password: string;
  userName: string;
  role: 'ADMIN' | 'GENERAL';
  isActive: boolean;
}