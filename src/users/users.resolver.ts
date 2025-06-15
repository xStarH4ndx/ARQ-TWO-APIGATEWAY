import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './userts.service';
import { Users } from './users.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => Users)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Users)
  createUserProfile(@Args('data') data: CreateUserInput) {
    return this.usersService.createUserProfile(data);
  }

  @Query(() => [Users])
  findAllUsers(
    @Args('limit', { nullable: true }) limit?: number,
    @Args('offset', { nullable: true }) offset?: number,
  ) {
    return this.usersService.findAllUsers({ limit, offset });
  }

  @Query(() => Users, { nullable: true })
  findOneUser(@Args('id') id: string) {
    return this.usersService.findOneUser(id);
  }

  @Query(() => Users, { nullable: true })
  findByAuthId(@Args('authId') authId: string) {
    return this.usersService.findByAuthId(authId);
  }

  @Query(() => Users, { nullable: true })
  findByEmail(@Args('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => Users)
  updateUser(@Args('id') id: string, @Args('updateData') updateData: UpdateUserInput) {
    return this.usersService.updateUser(id, updateData);
  }

  @Mutation(() => Users)
  updateByAuthId(@Args('authId') authId: string, @Args('updateData') updateData: UpdateUserInput) {
    return this.usersService.updateByAuthId(authId, updateData);
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Mutation(() => Boolean)
  deleteByAuthId(@Args('authId') authId: string) {
    return this.usersService.deleteByAuthId(authId);
  }

  @Query(() => [Users])
  searchUsersByName(@Args('name') name: string, @Args('limit', { nullable: true }) limit?: number) {
    return this.usersService.searchUsersByName(name, limit);
  }

  @Query(() => String)
  getUserStats() {
    return this.usersService.getUserStats();
  }

  @Query(() => Boolean)
  userExists(@Args('id') id: string) {
    return this.usersService.userExists(id);
  }

  @Query(() => Boolean)
  userExistsByAuthId(@Args('authId') authId: string) {
    return this.usersService.userExistsByAuthId(authId);
  }
}
