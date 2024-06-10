export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface SignUpBody extends LoginBody {
  username: string;
}
