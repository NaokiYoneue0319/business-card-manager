export type LoginRequest = {
  loginId: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};