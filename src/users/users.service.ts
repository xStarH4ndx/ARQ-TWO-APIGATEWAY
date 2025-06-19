import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  UsersGrpcService,
  UserGrpc,
  UpdateUserDataGrpc,
  CreateUserRequestGrpc,
  CreateUserResponseGrpc,
  FindAllUsersRequestGrpc,
  FindAllUsersResponseGrpc,
  FindOneUserRequestGrpc,
  FindOneUserResponseGrpc,
  FindByAuthIdRequestGrpc,
  FindByAuthIdResponseGrpc,
  FindByEmailRequestGrpc,
  FindByEmailResponseGrpc,
  UpdateUserRequestGrpc,
  UpdateUserResponseGrpc,
  UpdateByAuthIdRequestGrpc,
  UpdateByAuthIdResponseGrpc,
  DeleteUserRequestGrpc,
  DeleteUserResponseGrpc,
  DeleteByAuthIdRequestGrpc,
  DeleteByAuthIdResponseGrpc,
  SearchUsersByNameRequestGrpc,
  SearchUsersByNameResponseGrpc,
  GetUserStatsRequestGrpc,
  GetUserStatsResponseGrpc,
  UserExistsRequestGrpc,
  UserExistsResponseGrpc,
  UserExistsByAuthIdRequestGrpc,
  UserExistsByAuthIdResponseGrpc
} from './interfaces/users-grpc.interfaces';
import { UpdateUserInput } from './dto/update-user.input';

interface UsersGrpcServiceObservable {
  createUserProfile(data: CreateUserRequestGrpc): Observable<CreateUserResponseGrpc>;
  findAllUsers(data: FindAllUsersRequestGrpc): Observable<FindAllUsersResponseGrpc>;
  findOneUser(data: FindOneUserRequestGrpc): Observable<FindOneUserResponseGrpc>;
  findByAuthId(data: FindByAuthIdRequestGrpc): Observable<FindByAuthIdResponseGrpc>;
  findByEmail(data: FindByEmailRequestGrpc): Observable<FindByEmailResponseGrpc>;
  updateUser(data: UpdateUserRequestGrpc): Observable<UpdateUserResponseGrpc>;
  updateByAuthId(data: UpdateByAuthIdRequestGrpc): Observable<UpdateByAuthIdResponseGrpc>;
  deleteUser(data: DeleteUserRequestGrpc): Observable<DeleteUserResponseGrpc>;
  deleteByAuthId(data: DeleteByAuthIdRequestGrpc): Observable<DeleteByAuthIdResponseGrpc>;
  searchUsersByName(data: SearchUsersByNameRequestGrpc): Observable<SearchUsersByNameResponseGrpc>;
  getUserStats(data: GetUserStatsRequestGrpc): Observable<GetUserStatsResponseGrpc>;
  userExists(data: UserExistsRequestGrpc): Observable<UserExistsResponseGrpc>;
  userExistsByAuthId(data: UserExistsByAuthIdRequestGrpc): Observable<UserExistsByAuthIdResponseGrpc>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);
  private usersService: UsersGrpcServiceObservable;

  constructor(@Inject('MICROSERVICE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersGrpcServiceObservable>('UsersService');
  }

  // ==================== MÉTODOS QUE DEVUELVEN OBJETOS SIMPLES PARA GRAPHQL ====================

  async createUserProfile(createUserData: any): Promise<any> {
    try {
      this.logger.log(`Creating user profile: ${JSON.stringify(createUserData)}`);
      
      const request: CreateUserRequestGrpc = {
        authId: createUserData.authId,
        firstName: createUserData.firstName,
        lastName: createUserData.lastName,
        email: createUserData.email
      };
      
      this.logger.log(`Sending to microservice: ${JSON.stringify(request)}`);
      const result = await this.usersService.createUserProfile(request).toPromise();
      
      if (!result || !result.user) {
        throw new Error('No se pudo crear el perfil de usuario - respuesta vacía del microservicio');
      }
      
      return this.transformUserFromGrpc(result.user);
    } catch (error) {
      this.logger.error(`Error creating user profile: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAllUsers(findAllUsersData: any): Promise<any> {
    try {
      const request: FindAllUsersRequestGrpc = {
        limit: findAllUsersData?.limit || 10,
        offset: findAllUsersData?.offset || 0
      };
      
      this.logger.log(`Finding all users: ${JSON.stringify(request)}`);
      const result = await this.usersService.findAllUsers(request).toPromise();
      
      if (!result || !result.users) {
        throw new Error('No se encontraron usuarios o la respuesta del microservicio es inválida');
      }

      return {
        users: result.users.map(user => this.transformUserFromGrpc(user)),
        total: result.total
      };
    } catch (error) {
      this.logger.error(`Error finding users: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOneUser(findOneUserData: any): Promise<any> {
    try {
      const request: FindOneUserRequestGrpc = {
        id: findOneUserData.id
      };
      
      this.logger.log(`Finding user by id: ${JSON.stringify(request)}`);
      const result = await this.usersService.findOneUser(request).toPromise();

      if (!result || !result.user) {
        throw new Error('No se encontró el usuario - respuesta vacía del microservicio');
      }

      return this.transformUserFromGrpc(result.user);
    } catch (error) {
      this.logger.error(`Error finding user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByAuthId(authId: string): Promise<any> {
    try {
      const request: FindByAuthIdRequestGrpc = { authId };
      
      this.logger.log(`Finding user by authId: ${JSON.stringify(request)}`);
      const result = await this.usersService.findByAuthId(request).toPromise();
      
      if (!result) {
        throw new Error('No se encontró el usuario por authId - respuesta vacía del microservicio');
      }

      return {
        user: result.user ? this.transformUserFromGrpc(result.user) : null,
        found: result.found
      };
    } catch (error) {
      this.logger.error(`Error finding user by authId: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const request: FindByEmailRequestGrpc = { email };
      
      this.logger.log(`Finding user by email: ${JSON.stringify(request)}`);
      const result = await this.usersService.findByEmail(request).toPromise();
      
      if (!result) {
        throw new Error('No se encontró el usuario por email - respuesta vacía del microservicio');
      }

      return {
        user: result.user ? this.transformUserFromGrpc(result.user) : null,
        found: result.found
      };
    } catch (error) {
      this.logger.error(`Error finding user by email: ${error.message}`, error.stack);
      throw error;
    }
  }

async updateUser(updateUserData: { id: string; updateData: UpdateUserInput }): Promise<any> {
  try {
    const request: UpdateUserRequestGrpc = {
      id: updateUserData.id,
      updateData: {
        firstName: updateUserData.updateData.firstName,
        lastName: updateUserData.updateData.lastName,
        email: updateUserData.updateData.email,
        isActive: updateUserData.updateData.isActive,
        lastLogin: updateUserData.updateData.lastLogin
      }
    };

    this.logger.log(`Updating user: ${JSON.stringify(request)}`);
    const result = await this.usersService.updateUser(request).toPromise();

    if (!result || !result.user) {
      throw new Error('No se pudo actualizar el usuario - respuesta vacía del microservicio');
    }
    
    return this.transformUserFromGrpc(result.user);
  } catch (error) {
    this.logger.error(`Error updating user: ${error.message}`, error.stack);
    throw error;
  }
}

async updateByAuthId(updateByAuthIdData: { authId: string; updateData: UpdateUserInput }): Promise<any> {
  try {
    const request: UpdateByAuthIdRequestGrpc = {
      authId: updateByAuthIdData.authId,
      updateData: {
        firstName: updateByAuthIdData.updateData.firstName,
        lastName: updateByAuthIdData.updateData.lastName,
        email: updateByAuthIdData.updateData.email,
        isActive: updateByAuthIdData.updateData.isActive,
        lastLogin: updateByAuthIdData.updateData.lastLogin
      }
    };

    this.logger.log(`Updating user by authId: ${JSON.stringify(request)}`);
    const result = await this.usersService.updateByAuthId(request).toPromise();

    if (!result || !result.user) {
      throw new Error('No se pudo actualizar el usuario por authId - respuesta vacía del microservicio');
    }
    
    return this.transformUserFromGrpc(result.user);
  } catch (error) {
    this.logger.error(`Error updating user by authId: ${error.message}`, error.stack);
    throw error;
  }
}

  async deleteUser(id: string): Promise<any> {
    try {
      const request: DeleteUserRequestGrpc = { id };
      
      this.logger.log(`Deleting user: ${JSON.stringify(request)}`);
      const result = await this.usersService.deleteUser(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error deleting user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async deleteByAuthId(authId: string): Promise<any> {
    try {
      const request: DeleteByAuthIdRequestGrpc = { authId };
      
      this.logger.log(`Deleting user by authId: ${JSON.stringify(request)}`);
      const result = await this.usersService.deleteByAuthId(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error deleting user by authId: ${error.message}`, error.stack);
      throw error;
    }
  }

  async searchUsersByName(name: string, limit?: number): Promise<any> {
    try {
      const request: SearchUsersByNameRequestGrpc = {
        name,
        limit: limit || 50
      };
      
      this.logger.log(`Searching users by name: ${JSON.stringify(request)}`);
      const result = await this.usersService.searchUsersByName(request).toPromise();
      
      if (!result || !result.users) {
        throw new Error('No se encontraron usuarios por nombre o la respuesta del microservicio es inválida');
      }
      
      return {
        users: result.users.map(user => this.transformUserFromGrpc(user))
      };
    } catch (error) {
      this.logger.error(`Error searching users by name: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUserStats(): Promise<any> {
    try {
      const request: GetUserStatsRequestGrpc = {};
      
      this.logger.log('Getting user stats');
      const result = await this.usersService.getUserStats(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error getting user stats: ${error.message}`, error.stack);
      throw error;
    }
  }

  async userExists(userId: string): Promise<any> {
    try {
      const request: UserExistsRequestGrpc = { id: userId };
      
      this.logger.log(`Checking if user exists: ${JSON.stringify(request)}`);
      const result = await this.usersService.userExists(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error checking if user exists: ${error.message}`, error.stack);
      throw error;
    }
  }

  async userExistsByAuthId(authId: string): Promise<any> {
    try {
      const request: UserExistsByAuthIdRequestGrpc = { authId };
      
      this.logger.log(`Checking if user exists by authId: ${JSON.stringify(request)}`);
      const result = await this.usersService.userExistsByAuthId(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error checking if user exists by authId: ${error.message}`, error.stack);
      throw error;
    }
  }

  // ==================== MÉTODOS HELPER ====================

  private transformUserFromGrpc(userGrpc: UserGrpc): any {
    return {
      id: userGrpc.id,
      authId: userGrpc.authId,
      firstName: userGrpc.firstName,
      lastName: userGrpc.lastName,
      email: userGrpc.email,
      isActive: userGrpc.isActive,
      lastLogin: userGrpc.lastLogin,
      createdAt: userGrpc.createdAt,
      updatedAt: userGrpc.updatedAt
    };
  }
}