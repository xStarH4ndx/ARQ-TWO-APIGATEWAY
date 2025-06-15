import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { AuthService } from './auth.services';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { ValidateUserInput } from './dto/validate-user.input';
import { ValidateTokenInput } from './dto/validate-token.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './models/user.model';
import { AuthResponse } from './models/auth-response.model';
import { SuccessResponse } from './models/success-response.model';


interface VerifyEmailRequest {
  token: string;
}

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse)
  login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => SuccessResponse)
  verifyEmail(@Args('input') data : VerifyEmailRequest) {
    return this.authService.verifyEmail(data);
  }

  @Mutation(() => SuccessResponse)
  forgotPassword(@Args('input') input: ForgotPasswordInput) {
    return this.authService.forgotPassword(input);
  }

  @Mutation(() => SuccessResponse)
  resetPassword(@Args('input') input: ResetPasswordInput) {
    return this.authService.resetPassword(input);
  }

  @Mutation(() => User)
  validateUser(@Args('input') input: ValidateUserInput) {
    return this.authService.validateUser(input);
  }

  @Mutation(() => User)
  validateToken(@Args('input') input: ValidateTokenInput) {
    return this.authService.validateToken(input);
  }

  @Query(() => [User])
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  @Query(() => User)
  findOneUser(@Args('id', { type: () => ID }) id: string) {
    return this.authService.findOneUser(id);
  }

  @Query(() => User)
  findUserByEmail(@Args('email') email: string) {
    return this.authService.findUserByEmail(email);
  }

  @Mutation(() => User)
  updateUser(@Args('input') input: UpdateUserInput) {
    return this.authService.updateUser(input);
  }

  @Mutation(() => SuccessResponse)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.authService.removeUser(id);
  }
}
