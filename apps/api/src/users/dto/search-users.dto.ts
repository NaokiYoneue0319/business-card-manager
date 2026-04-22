export class SearchUsersDto {
  userName?: string;
  loginId?: string;
  role?: 'ADMIN' | 'GENERAL';
  isActive?: 'true' | 'false';
}