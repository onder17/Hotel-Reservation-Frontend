// API'ya gönderilen istek tipleri
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

// Auth Context tipi
export interface AuthContextType {
  accessToken: string | null;
  refreshToken: () => Promise<string | null>;
  login: (data: LoginRequest) => Promise<string | null>;
  register: (data: RegisterRequest) => Promise<string | null>;
  logout: () => void;
}
