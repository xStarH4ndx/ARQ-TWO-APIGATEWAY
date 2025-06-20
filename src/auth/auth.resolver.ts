import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ValidateUserInput } from './dto/validate-user.input';
import { ValidateTokenInput } from './dto/validate-token.input';
import { User } from './models/user.model';
import { AuthResponse } from './models/auth-response.model';
import { LoginResponse } from './models/login-response.model';
import { SuccessResponse } from './models/success-response.model';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);

  constructor(private readonly authService: AuthService) {}

@Mutation(() => LoginResponse)
async login(@Args('input') input: LoginInput): Promise<LoginResponse> {
  this.logger.log(`GraphQL login: ${JSON.stringify(input)}`);
  try {
    const response = await this.authService.login(input);
    return {
      success: response.success,
      message: response.message,
      error: response.error,
      data: response.data ? {
        accessToken: response.data.access_token,
        user: this.transformUserFromGrpc(response.data.user),
      } : undefined,
    };
  } catch (error) {
    this.logger.error(`GraphQL login error: ${error.message}`);
    return {
      success: false,
      message: 'Login failed',
      error: error.message,
      data: undefined,
    };
  }
}

@Mutation(() => AuthResponse)
async register(@Args('input') input: RegisterInput): Promise<AuthResponse> {
  this.logger.log(`GraphQL register: ${JSON.stringify(input)}`);
  try {
    const response = await this.authService.register(input);
    return {
      success: response.success,
      message: response.message,
      error: response.error,
      data: response.data ? this.transformUserFromGrpc(response.data) : undefined,
      verificationToken: response.verificationToken,
    };
  } catch (error) {
    this.logger.error(`GraphQL register error: ${error.message}`);
    return {
      success: false,
      message: 'Registration failed',
      error: error.message,
      data: undefined,
      verificationToken: undefined,
    };
  }
}

  @Mutation(() => SuccessResponse)
  async forgotPassword(@Args('input') input: ForgotPasswordInput): Promise<SuccessResponse> {
    this.logger.log(`GraphQL forgotPassword: ${JSON.stringify(input)}`);
    try {
      const response = await this.authService.forgotPassword(input);
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      this.logger.error(`GraphQL forgotPassword error: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Forgot password failed',
      };
    }
  }

  @Mutation(() => SuccessResponse)
  async resetPassword(@Args('input') input: ResetPasswordInput): Promise<SuccessResponse> {
    this.logger.log(`GraphQL resetPassword: ${JSON.stringify(input)}`);
    try {
      const response = await this.authService.resetPassword(input);
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error) {
      this.logger.error(`GraphQL resetPassword error: ${error.message}`);
      return {
        success: false,
        message: error.message || 'Reset password failed',
      };
    }
  }

  @Mutation(() => SuccessResponse)
  async verifyEmail(@Args('input') input: { token: string }): Promise<SuccessResponse> {
    this.logger.log(`GraphQL verifyEmail: ${JSON.stringify(input)}`);
    try {
      const response = await this.authService.verifyEmail(input);
      return {
        success: response.success,
        message: response.message,
        error: response.error,
      };
    } catch (error) {
      this.logger.error(`GraphQL verifyEmail error: ${error.message}`);
      return {
        success: false,
        message: 'Email verification failed',
        error: error.message,
      };
    }
  }

  @Query(() => User)
  async validateUser(@Args('input') input: ValidateUserInput): Promise<User> {
    this.logger.log(`GraphQL validateUser: ${JSON.stringify(input)}`);
    try {
      const response = await this.authService.validateUser(input);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'User validation failed');
      }
      return this.transformUserFromGrpc(response.data);
    } catch (error) {
      this.logger.error(`GraphQL validateUser error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => User)
  async validateToken(@Args('input') input: ValidateTokenInput): Promise<User> {
    this.logger.log(`GraphQL validateToken: ${JSON.stringify(input)}`);
    try {
      const response = await this.authService.validateToken(input);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Token validation failed');
      }
      
      // Para validateToken, necesitamos obtener el usuario usando el sub del token
      const userResponse = await this.authService.findOneUser(response.data.sub);
      if (!userResponse.success || !userResponse.data) {
        throw new Error('User not found');
      }
      
      return this.transformUserFromGrpc(userResponse.data);
    } catch (error) {
      this.logger.error(`GraphQL validateToken error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    this.logger.log(`GraphQL findAllUsers`);
    try {
      const response = await this.authService.findAllUsers();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch users');
      }
      return response.data.map(user => this.transformUserFromGrpc(user));
    } catch (error) {
      this.logger.error(`GraphQL findAllUsers error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => User)
  async findOneUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    this.logger.log(`GraphQL findOneUser: id=${id}`);
    try {
      const response = await this.authService.findOneUser(id);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'User not found');
      }
      return this.transformUserFromGrpc(response.data);
    } catch (error) {
      this.logger.error(`GraphQL findOneUser error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => User)
  async findUserByEmail(@Args('email') email: string): Promise<User> {
    this.logger.log(`GraphQL findUserByEmail: email=${email}`);
    try {
      const response = await this.authService.findUserByEmail(email);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'User not found');
      }
      return this.transformUserFromGrpc(response.data);
    } catch (error) {
      this.logger.error(`GraphQL findUserByEmail error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => SuccessResponse)
  async removeUser(@Args('id', { type: () => ID }) id: string): Promise<SuccessResponse> {
    this.logger.log(`GraphQL removeUser: id=${id}`);
    try {
      const response = await this.authService.removeUser(id);
      return {
        success: response.success,
        message: response.message,
        error: response.error,
      };
    } catch (error) {
      this.logger.error(`GraphQL removeUser error: ${error.message}`);
      return {
        success: false,
        message: 'Remove user failed',
        error: error.message,
      };
    }
  }

  private transformUserFromGrpc(grpcUser: any): User {
    return {
      id: grpcUser.id,
      email: grpcUser.email,
      isVerified: grpcUser.isVerified,
      resetToken: grpcUser.resetToken,
      resetTokenExpiration: grpcUser.resetTokenExpiration,
      createdAt: grpcUser.createdAt,
      updatedAt: grpcUser.updatedAt,
    };
  }
}