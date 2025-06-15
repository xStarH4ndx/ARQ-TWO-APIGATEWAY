import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  lastLogin?: string;
}

interface UsersGrpcService {
  CreateUserProfile(data: {
    authId: string;
    firstName: string;
    lastName: string;
    email: string;
  }): Observable<any>;

  FindAllUsers(data: {
    limit?: number;
    offset?: number;
  }): Observable<any>;

  FindOneUser(data: {
    id: string;
  }): Observable<any>;

  FindByAuthId(data: {
    authId: string;
  }): Observable<any>;

  FindByEmail(data: {
    email: string;
  }): Observable<any>;

  UpdateUser(data: {
    id: string;
    updateData: UpdateUserData;
  }): Observable<any>;

  UpdateByAuthId(data: {
    authId: string;
    updateData: UpdateUserData;
  }): Observable<any>;

  DeleteUser(data: {
    id: string;
  }): Observable<any>;

  DeleteByAuthId(data: {
    authId: string;
  }): Observable<any>;

  SearchUsersByName(data: {
    name: string;
    limit?: number;
  }): Observable<any>;

  GetUserStats(data: {}): Observable<any>;

  UserExists(data: {
    id: string;
  }): Observable<any>;

  UserExistsByAuthId(data: {
    authId: string;
  }): Observable<any>;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersGrpcService;

  constructor(
    @Inject('MICROSERVICE_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersGrpcService>('UsersService');
  }

  createUserProfile(data: {
    authId: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    return this.usersService.CreateUserProfile(data);
  }

  findAllUsers(params?: { limit?: number; offset?: number }) {
    return this.usersService.FindAllUsers(params || {});
  }

  findOneUser(id: string) {
    return this.usersService.FindOneUser({ id });
  }

  findByAuthId(authId: string) {
    return this.usersService.FindByAuthId({ authId });
  }

  findByEmail(email: string) {
    return this.usersService.FindByEmail({ email });
  }

  updateUser(id: string, updateData: UpdateUserData) {
    return this.usersService.UpdateUser({ id, updateData });
  }

  updateByAuthId(authId: string, updateData: UpdateUserData) {
    return this.usersService.UpdateByAuthId({ authId, updateData });
  }

  deleteUser(id: string) {
    return this.usersService.DeleteUser({ id });
  }

  deleteByAuthId(authId: string) {
    return this.usersService.DeleteByAuthId({ authId });
  }

  searchUsersByName(name: string, limit?: number) {
    return this.usersService.SearchUsersByName({ name, limit });
  }

  getUserStats() {
    return this.usersService.GetUserStats({});
  }

  userExists(id: string) {
    return this.usersService.UserExists({ id });
  }

  userExistsByAuthId(authId: string) {
    return this.usersService.UserExistsByAuthId({ authId });
  }
}
