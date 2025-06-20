import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import {
  RegisterRequest,
  LoginRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ValidateUserRequest,
  ValidateTokenRequest,
  FindOneRequest,
  FindByEmailRequest,
  UpdateUserRequest,
  RemoveUserRequest,
  Empty,
  AuthResponse,
  LoginResponse,
  BaseResponse,
  UserResponse,
  UsersResponse,
  ValidateUserResponse,
  ValidateTokenResponse,
  ForgotPasswordResponse
} from './interface/auth-grpc.interfaces';

interface AuthGrpcService {
  Register(data: RegisterRequest): Observable<AuthResponse>;
  Login(data: LoginRequest): Observable<LoginResponse>;
  VerifyEmail(data: VerifyEmailRequest): Observable<BaseResponse>;
  ForgotPassword(data: ForgotPasswordRequest): Observable<ForgotPasswordResponse>; 
  ResetPassword(data: ResetPasswordRequest): Observable<BaseResponse>;
  ValidateUser(data: ValidateUserRequest): Observable<ValidateUserResponse>; 
  ValidateToken(data: ValidateTokenRequest): Observable<ValidateTokenResponse>; 
  FindAllUsers(data: Empty): Observable<UsersResponse>;
  FindOneUser(data: FindOneRequest): Observable<UserResponse>;
  FindUserByEmail(data: FindByEmailRequest): Observable<UserResponse>;
  UpdateUser(data: UpdateUserRequest): Observable<UserResponse>;
  RemoveUser(data: RemoveUserRequest): Observable<BaseResponse>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthGrpcService;
  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject('MICROSERVICE_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthGrpcService>('AuthService');
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    this.logger.log(`Registering user: ${JSON.stringify(data)}`);
    try {
      return await firstValueFrom(this.authService.Register(data));
    } catch (error) {
      this.logger.error(`Register error: ${error.message}`);
      throw error;
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    this.logger.log(`Logging in user: ${JSON.stringify(data)}`);
    try {
      return await firstValueFrom(this.authService.Login(data));
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`);
      throw error;
    }
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<BaseResponse> {
    this.logger.log(`Verifying email with token: ${data.token}`);
    try {
      return await firstValueFrom(this.authService.VerifyEmail(data));
    } catch (error) {
      this.logger.error(`Verify email error: ${error.message}`);
      throw error;
    }
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    this.logger.log(`Requesting password reset for email: ${data.email}`);
    try {
      return await firstValueFrom(this.authService.ForgotPassword(data));
    } catch (error) {
      this.logger.error(`Forgot password error: ${error.message}`);
      throw error;
    }
  }

  async resetPassword(data: ResetPasswordRequest): Promise<BaseResponse> {
    this.logger.log(`Resetting password with token: ${data.token}`);
    try {
      return await firstValueFrom(this.authService.ResetPassword(data));
    } catch (error) {
      this.logger.error(`Reset password error: ${error.message}`);
      throw error;
    }
  }

  async validateUser(data: ValidateUserRequest): Promise<ValidateUserResponse> {
    this.logger.log(`Validating user: ${JSON.stringify(data)}`);
    try {
      return await firstValueFrom(this.authService.ValidateUser(data));
    } catch (error) {
      this.logger.error(`Validate user error: ${error.message}`);
      throw error;
    }
  }

  async validateToken(data: ValidateTokenRequest): Promise<ValidateTokenResponse> {
    this.logger.log(`Validating token: ${data.token}`);
    try {
      return await firstValueFrom(this.authService.ValidateToken(data));
    } catch (error) {
      this.logger.error(`Validate token error: ${error.message}`);
      throw error;
    }
  }

  async findAllUsers(): Promise<UsersResponse> {
    this.logger.log(`Finding all users`);
    try {
      return await firstValueFrom(this.authService.FindAllUsers({}));
    } catch (error) {
      this.logger.error(`Find all users error: ${error.message}`);
      throw error;
    }
  }

  async findOneUser(id: string): Promise<UserResponse> {
    this.logger.log(`Finding user by id: ${id}`);
    try {
      return await firstValueFrom(this.authService.FindOneUser({ id }));
    } catch (error) {
      this.logger.error(`Find one user error: ${error.message}`);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<UserResponse> {
    this.logger.log(`Finding user by email: ${email}`);
    try {
      return await firstValueFrom(this.authService.FindUserByEmail({ email }));
    } catch (error) {
      this.logger.error(`Find user by email error: ${error.message}`);
      throw error;
    }
  }

  async updateUser(data: UpdateUserRequest): Promise<UserResponse> {
    this.logger.log(`Updating user: ${JSON.stringify(data)}`);
    try {
      return await firstValueFrom(this.authService.UpdateUser(data));
    } catch (error) {
      this.logger.error(`Update user error: ${error.message}`);
      throw error;
    }
  }

  async removeUser(id: string): Promise<BaseResponse> {
    this.logger.log(`Removing user with id: ${id}`);
    try {
      return await firstValueFrom(this.authService.RemoveUser({ id }));
    } catch (error) {
      this.logger.error(`Remove user error: ${error.message}`);
      throw error;
    }
  }
}