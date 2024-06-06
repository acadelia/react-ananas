export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

interface AuthBody {
  email: string;
  password: string;
}

export interface LoginBody extends AuthBody {}

export interface SignUpBody extends AuthBody {
  userName: string;
}
