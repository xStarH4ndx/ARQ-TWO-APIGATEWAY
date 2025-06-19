import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Users } from './users.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Logger } from '@nestjs/common';

@Resolver(() => Users)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => Users)
  async createUserProfile(@Args('data') data: CreateUserInput): Promise<Users> {
    try {
      this.logger.log(`GraphQL createUserProfile: ${JSON.stringify(data)}`);
      return await this.usersService.createUserProfile(data);
    } catch (error) {
      this.logger.error(`GraphQL createUserProfile error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => [Users])
  async findAllUsers(
    @Args('limit', { nullable: true }) limit?: number,
    @Args('offset', { nullable: true }) offset?: number,
  ): Promise<Users[]> {
    try {
      this.logger.log(`GraphQL findAllUsers: limit=${limit}, offset=${offset}`);
      return await this.usersService.findAllUsers({ limit, offset });
    } catch (error) {
      this.logger.error(`GraphQL findAllUsers error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => Users, { nullable: true })
  async findOneUser(@Args('id') id: string): Promise<Users | null> {
    try {
      this.logger.log(`GraphQL findOneUser: id=${id}`);
      return await this.usersService.findOneUser(id);
    } catch (error) {
      this.logger.error(`GraphQL findOneUser error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => Users, { nullable: true })
  async findByAuthId(@Args('authId') authId: string): Promise<Users | null> {
    try {
      this.logger.log(`GraphQL findByAuthId: authId=${authId}`);
      return await this.usersService.findByAuthId(authId);
    } catch (error) {
      this.logger.error(`GraphQL findByAuthId error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => Users, { nullable: true })
  async findByEmail(@Args('email') email: string): Promise<Users | null> {
    try {
      this.logger.log(`GraphQL findByEmail: email=${email}`);
      return await this.usersService.findByEmail(email);
    } catch (error) {
      this.logger.error(`GraphQL findByEmail error: ${error.message}`);
      throw error;
    }
  }

@Mutation(() => Users)
async updateUser(
  @Args('id') id: string,
  @Args('updateData') updateData: UpdateUserInput
): Promise<Users> {
  try {
    this.logger.log(`GraphQL updateUser: id=${id}, updateData=${JSON.stringify(updateData)}`);
    return await this.usersService.updateUser({ id, updateData }); 
  } catch (error) {
    this.logger.error(`GraphQL updateUser error: ${error.message}`);
    throw error;
  }
}

@Mutation(() => Users)
async updateByAuthId(
  @Args('authId') authId: string,
  @Args('updateData') updateData: UpdateUserInput
): Promise<Users> {
  try {
    this.logger.log(`GraphQL updateByAuthId: authId=${authId}, updateData=${JSON.stringify(updateData)}`);
    return await this.usersService.updateByAuthId({ authId, updateData });
  } catch (error) {
    this.logger.error(`GraphQL updateByAuthId error: ${error.message}`);
    throw error;
  }
}

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    try {
      this.logger.log(`GraphQL deleteUser: id=${id}`);
      return await this.usersService.deleteUser(id);
    } catch (error) {
      this.logger.error(`GraphQL deleteUser error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async deleteByAuthId(@Args('authId') authId: string): Promise<boolean> {
    try {
      this.logger.log(`GraphQL deleteByAuthId: authId=${authId}`);
      return await this.usersService.deleteByAuthId(authId);
    } catch (error) {
      this.logger.error(`GraphQL deleteByAuthId error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => [Users])
  async searchUsersByName(@Args('name') name: string, @Args('limit', { nullable: true }) limit?: number): Promise<Users[]> {
    try {
      this.logger.log(`GraphQL searchUsersByName: name=${name}, limit=${limit}`);
      return await this.usersService.searchUsersByName(name, limit);
    } catch (error) {
      this.logger.error(`GraphQL searchUsersByName error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => String)
  async getUserStats(): Promise<string> {
    try {
      this.logger.log('GraphQL getUserStats');
      return await this.usersService.getUserStats();
    } catch (error) {
      this.logger.error(`GraphQL getUserStats error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => Boolean)
  async userExists(@Args('id') id: string): Promise<boolean> {
    try {
      this.logger.log(`GraphQL userExists: id=${id}`);
      return await this.usersService.userExists(id);
    } catch (error) {
      this.logger.error(`GraphQL userExists error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => Boolean)
  async userExistsByAuthId(@Args('authId') authId: string): Promise<boolean> {
    try {
      this.logger.log(`GraphQL userExistsByAuthId: authId=${authId}`);
      return await this.usersService.userExistsByAuthId(authId);
    } catch (error) {
      this.logger.error(`GraphQL userExistsByAuthId error: ${error.message}`);
      throw error;
    }
  }
}