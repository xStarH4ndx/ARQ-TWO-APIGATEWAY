import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { UsersService } from './userts.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('profile')
  createUserProfile(@Body() data: { authId: string; firstName: string; lastName: string; email: string }) {
    return this.usersService.createUserProfile(data);
  }

  @Get()
  findAllUsers(@Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.usersService.findAllUsers({ limit, offset });
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Get('auth/:authId')
  findByAuthId(@Param('authId') authId: string) {
    return this.usersService.findByAuthId(authId);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateData: any) {
    return this.usersService.updateUser(id, updateData);
  }

  @Patch('auth/:authId')
  updateByAuthId(@Param('authId') authId: string, @Body() updateData: any) {
    return this.usersService.updateByAuthId(authId, updateData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Delete('auth/:authId')
  deleteByAuthId(@Param('authId') authId: string) {
    return this.usersService.deleteByAuthId(authId);
  }

  @Get('search/name/:name')
  searchUsersByName(@Param('name') name: string, @Query('limit') limit?: number) {
    return this.usersService.searchUsersByName(name, limit);
  }

  @Get('stats')
  getUserStats() {
    return this.usersService.getUserStats();
  }

  @Get('exists/:id')
  userExists(@Param('id') id: string) {
    return this.usersService.userExists(id);
  }

  @Get('exists/auth/:authId')
  userExistsByAuthId(@Param('authId') authId: string) {
    return this.usersService.userExistsByAuthId(authId);
  }
}