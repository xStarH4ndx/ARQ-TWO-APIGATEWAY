import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface RegisterRequest {
  email: string;
  password: string;
  isVerified?: boolean;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface VerifyEmailRequest {
  token: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ValidateUserRequest {
  email: string;
  password: string;
}

interface ValidateTokenRequest {
  token: string;
}

interface FindOneRequest {
  id: string;
}

interface FindByEmailRequest {
  email: string;
}

interface UpdateUserRequest {
  id: string;
  email?: string;
  password?: string;
  isVerified?: boolean;
  resetToken?: string;
  resetTokenExpiration?: string;
}

interface RemoveUserRequest {
  id: string;
}

interface Empty {}

interface AuthGrpcService {
  Register(data: RegisterRequest): Observable<any>;
  Login(data: LoginRequest): Observable<any>;
  VerifyEmail(data: VerifyEmailRequest): Observable<any>;
  ForgotPassword(data: ForgotPasswordRequest): Observable<any>;
  ResetPassword(data: ResetPasswordRequest): Observable<any>;
  ValidateUser(data: ValidateUserRequest): Observable<any>;
  ValidateToken(data: ValidateTokenRequest): Observable<any>;
  FindAllUsers(data: Empty): Observable<any>;
  FindOneUser(data: FindOneRequest): Observable<any>;
  FindUserByEmail(data: FindByEmailRequest): Observable<any>;
  UpdateUser(data: UpdateUserRequest): Observable<any>;
  RemoveUser(data: RemoveUserRequest): Observable<any>;
}


@Injectable()
export class AuthService {
  private authService: AuthGrpcService;

  constructor(@Inject('MICROSERVICE_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthGrpcService>('AuthService');
  }

  register(data: RegisterRequest) {
    return this.authService.Register(data);
  }

  login(data: LoginRequest) {
    return this.authService.Login(data);
  }

  verifyEmail(data: VerifyEmailRequest) {
    return this.authService.VerifyEmail(data);
  }

  forgotPassword(data: ForgotPasswordRequest) {
    return this.authService.ForgotPassword(data);
  }

  resetPassword(data: ResetPasswordRequest) {
    return this.authService.ResetPassword(data);
  }

  validateUser(data: ValidateUserRequest) {
    return this.authService.ValidateUser(data);
  }

  validateToken(data: ValidateTokenRequest) {
    return this.authService.ValidateToken(data);
  }

  findAllUsers() {
    return this.authService.FindAllUsers({});
  }

  findOneUser(id: string) {
    return this.authService.FindOneUser({ id });
  }

  findUserByEmail(email: string) {
    return this.authService.FindUserByEmail({ email });
  }

  updateUser(data: UpdateUserRequest) {
    return this.authService.UpdateUser(data);
  }

  removeUser(id: string) {
    return this.authService.RemoveUser({ id });
  }
}