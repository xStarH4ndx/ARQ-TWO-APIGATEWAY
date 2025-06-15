import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { AuthService } from './auth.services';
//ESTO NO SE USA PERO MEJOR QUE SOBRE A QUE FALTE
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() data: any) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: any) {
    return this.authService.login(data);
  }

  @Post('verify-email')
  verifyEmail(@Body() data: any) {
    return this.authService.verifyEmail(data);
  }

  @Post('forgot-password')
  forgotPassword(@Body() data: any) {
    return this.authService.forgotPassword(data);
  }

  @Post('reset-password')
  resetPassword(@Body() data: any) {
    return this.authService.resetPassword(data);
  }

  @Post('validate-user')
  validateUser(@Body() data: any) {
    return this.authService.validateUser(data);
  }

  @Post('validate-token')
  validateToken(@Body() data: any) {
    return this.authService.validateToken(data);
  }

  @Get('users')
  findAllUsers() {
    return this.authService.findAllUsers();
  }

  @Get('users/:id')
  findOneUser(@Param('id') id: string) {
    return this.authService.findOneUser(id);
  }

  @Get('users/email/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.authService.findUserByEmail(email);
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.authService.updateUser({ ...data, id });
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.authService.removeUser(id);
  }
}