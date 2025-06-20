// auth-grpc.interfaces.ts

export interface RegisterRequest {
  email: string;
  password: string;
  isVerified?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ValidateUserRequest {
  email: string;
  password: string;
}

export interface ValidateTokenRequest {
  token: string;
}

export interface FindOneRequest {
  id: string;
}

export interface FindByEmailRequest {
  email: string;
}

export interface UpdateUserRequest {
  id: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
  resetToken?: string;
  resetTokenExpiration?: string;
}

export interface RemoveUserRequest {
  id: string;
}

export interface Empty {}

export interface BaseResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: User;
  verificationToken?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: LoginData;
}

export interface LoginData {
  access_token: string;
  user: User;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  error?: string;
  resetToken?: string;
}

export interface ValidateUserResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: User;
}

export interface ValidateTokenResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: TokenPayload;
}

export interface UserResponse {
  success: boolean;
  message: string;
  error?: string;
  data?: User;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  error?: string;
  data: User[];
}

export interface User {
  id: string;
  email: string;
  isVerified: boolean;
  resetToken?: string;
  resetTokenExpiration?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}