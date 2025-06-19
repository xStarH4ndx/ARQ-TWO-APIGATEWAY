// ==================== INTERFACES PARA gRPC  ====================

export interface UserGrpc {
  id: string;
  authId: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  lastLogin: string; // ISO string format
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface UpdateUserDataGrpc {
  firstName?: string;
  lastName?: string;
  email?: string;
  isActive?: boolean;
  lastLogin?: string;
}

// Create User Profile
export interface CreateUserRequestGrpc {
  authId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserResponseGrpc {
  user: UserGrpc;
}

// Find All Users
export interface FindAllUsersRequestGrpc {
  limit?: number;
  offset?: number;
}

export interface FindAllUsersResponseGrpc {
  users: UserGrpc[];
  total: number;
}

// Find One User
export interface FindOneUserRequestGrpc {
  id: string;
}

export interface FindOneUserResponseGrpc {
  user: UserGrpc;
}

// Find By Auth ID
export interface FindByAuthIdRequestGrpc {
  authId: string;
}

export interface FindByAuthIdResponseGrpc {
  user: UserGrpc;
  found: boolean;
}

// Find By Email
export interface FindByEmailRequestGrpc {
  email: string;
}

export interface FindByEmailResponseGrpc {
  user: UserGrpc;
  found: boolean;
}

// Update User 
export interface UpdateUserRequestGrpc {
  id: string;
  updateData: UpdateUserDataGrpc;
}

export interface UpdateUserResponseGrpc {
  user: UserGrpc;
}

// Update By Auth ID
export interface UpdateByAuthIdRequestGrpc {
  authId: string;
  updateData: UpdateUserDataGrpc;
}

export interface UpdateByAuthIdResponseGrpc {
  user: UserGrpc;
}

// Delete User
export interface DeleteUserRequestGrpc {
  id: string;
}

export interface DeleteUserResponseGrpc {
  success: boolean;
}

// Delete By Auth ID
export interface DeleteByAuthIdRequestGrpc {
  authId: string;
}

export interface DeleteByAuthIdResponseGrpc {
  success: boolean;
}

// Search Users By Name
export interface SearchUsersByNameRequestGrpc {
  name: string;
  limit?: number;
}

export interface SearchUsersByNameResponseGrpc {
  users: UserGrpc[];
}

// Get User Stats
export interface GetUserStatsRequestGrpc {
  // Empty - no parameters needed
}

export interface GetUserStatsResponseGrpc {
  totalUsers: number;
  recentUsers: number;
}

// User Exists
export interface UserExistsRequestGrpc {
  id: string;
}

export interface UserExistsResponseGrpc {
  exists: boolean;
}

// User Exists By Auth ID
export interface UserExistsByAuthIdRequestGrpc {
  authId: string;
}

export interface UserExistsByAuthIdResponseGrpc {
  exists: boolean;
}

// ==================== INTERFACE DEL SERVICIO GRPC ====================

export interface UsersGrpcService {
  createUserProfile(data: CreateUserRequestGrpc): Promise<CreateUserResponseGrpc>;
  findAllUsers(data: FindAllUsersRequestGrpc): Promise<FindAllUsersResponseGrpc>;
  findOneUser(data: FindOneUserRequestGrpc): Promise<FindOneUserResponseGrpc>;
  findByAuthId(data: FindByAuthIdRequestGrpc): Promise<FindByAuthIdResponseGrpc>;
  findByEmail(data: FindByEmailRequestGrpc): Promise<FindByEmailResponseGrpc>;
  updateUser(data: UpdateUserRequestGrpc): Promise<UpdateUserResponseGrpc>;
  updateByAuthId(data: UpdateByAuthIdRequestGrpc): Promise<UpdateByAuthIdResponseGrpc>;
  deleteUser(data: DeleteUserRequestGrpc): Promise<DeleteUserResponseGrpc>;
  deleteByAuthId(data: DeleteByAuthIdRequestGrpc): Promise<DeleteByAuthIdResponseGrpc>;
  searchUsersByName(data: SearchUsersByNameRequestGrpc): Promise<SearchUsersByNameResponseGrpc>;
  getUserStats(data: GetUserStatsRequestGrpc): Promise<GetUserStatsResponseGrpc>;
  userExists(data: UserExistsRequestGrpc): Promise<UserExistsResponseGrpc>;
  userExistsByAuthId(data: UserExistsByAuthIdRequestGrpc): Promise<UserExistsByAuthIdResponseGrpc>;
}