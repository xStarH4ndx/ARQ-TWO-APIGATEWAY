// ==================== INTERFACES PARA gRPC (basadas en .proto) ====================

export interface HouseGrpc {
  id: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  userIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateHouseRequestGrpc {
  nombre: string;
  descripcion: string;
  codigo: string;
  userIds: string[];
}

export interface UpdateHouseRequestGrpc {
  id: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  userIds: string[];
}

export interface FindOneHouseRequestGrpc {
  id: string;
}

export interface FindHouseByCodeRequestGrpc {
  codigo: string;
}

export interface RemoveHouseRequestGrpc {
  id: string;
}

export interface FindAllHousesRequestGrpc {
  limit: number;
  offset: number;
}

export interface HousesResponseGrpc {
  houses: HouseGrpc[];
  total: number;
}

export interface AddUserToHouseRequestGrpc {
  houseId: string;
  userId: string;
}

export interface RemoveUserFromHouseRequestGrpc {
  houseId: string;
  userId: string;
}

export interface GetUsersInHouseRequestGrpc {
  houseId: string;
}

export interface GetUsersInHouseResponseGrpc {
  userIds: string[];
}

export interface GetHousesByUserRequestGrpc {
  userId: string;
}

export interface GetHousesByUserResponseGrpc {
  houses: HouseGrpc[];
}

export interface IsUserInHouseRequestGrpc {
  houseId: string;
  userId: string;
}

export interface IsUserInHouseResponseGrpc {
  isInHouse: boolean;
}

export interface SearchHousesByNameRequestGrpc {
  name: string;
  limit: number;
}

export interface SearchHousesByNameResponseGrpc {
  houses: HouseGrpc[];
}

export interface HouseExistsRequestGrpc {
  id: string;
}

export interface HouseExistsResponseGrpc {
  exists: boolean;
}

export interface GetHouseStatsRequestGrpc {}

export interface GetHouseStatsResponseGrpc {
  totalHouses: number;
  recentHouses: number;
  housesWithUsers: number;
  housesWithoutUsers: number;
  averageUsersPerHouse: number;
}

export interface SuccessResponseGrpc {
  success: boolean;
}

export interface AddUserToHouseByIdRequestGrpc {
  house_id: string;
  user_id: string;
}

export interface AddUserToHouseByIdResponseGrpc {
  success: boolean;
  message: string;
}

// ==================== INTERFACE DEL SERVICIO GRPC ====================

export interface HousesGrpcService {
  createHouse(data: CreateHouseRequestGrpc): Promise<HouseGrpc>;
  findAllHouses(data: FindAllHousesRequestGrpc): Promise<HousesResponseGrpc>;
  findOneHouse(data: FindOneHouseRequestGrpc): Promise<HouseGrpc>;
  findHouseByCode(data: FindHouseByCodeRequestGrpc): Promise<HouseGrpc>;
  updateHouse(data: UpdateHouseRequestGrpc): Promise<HouseGrpc>;
  removeHouse(data: RemoveHouseRequestGrpc): Promise<SuccessResponseGrpc>;
  addUserToHouse(data: AddUserToHouseRequestGrpc): Promise<HouseGrpc>;
  addUserToHouseById(data: AddUserToHouseByIdRequestGrpc): Promise<AddUserToHouseByIdResponseGrpc>;
  removeUserFromHouse(data: RemoveUserFromHouseRequestGrpc): Promise<HouseGrpc>;
  getUsersInHouse(data: GetUsersInHouseRequestGrpc): Promise<GetUsersInHouseResponseGrpc>;
  getHousesByUser(data: GetHousesByUserRequestGrpc): Promise<GetHousesByUserResponseGrpc>;
  isUserInHouse(data: IsUserInHouseRequestGrpc): Promise<IsUserInHouseResponseGrpc>;
  searchHousesByName(data: SearchHousesByNameRequestGrpc): Promise<SearchHousesByNameResponseGrpc>;
  getHouseStats(data: GetHouseStatsRequestGrpc): Promise<GetHouseStatsResponseGrpc>;
  houseExists(data: HouseExistsRequestGrpc): Promise<HouseExistsResponseGrpc>;
}