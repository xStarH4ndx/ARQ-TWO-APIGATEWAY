import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  HousesGrpcService,
  HouseGrpc,
  CreateHouseRequestGrpc,
  UpdateHouseRequestGrpc,
  FindOneHouseRequestGrpc,
  FindHouseByCodeRequestGrpc,
  RemoveHouseRequestGrpc,
  FindAllHousesRequestGrpc,
  HousesResponseGrpc,
  AddUserToHouseRequestGrpc,
  RemoveUserFromHouseRequestGrpc,
  GetUsersInHouseRequestGrpc,
  GetUsersInHouseResponseGrpc,
  GetHousesByUserRequestGrpc,
  GetHousesByUserResponseGrpc,
  IsUserInHouseRequestGrpc,
  IsUserInHouseResponseGrpc,
  SearchHousesByNameRequestGrpc,
  SearchHousesByNameResponseGrpc,
  HouseExistsRequestGrpc,
  HouseExistsResponseGrpc,
  GetHouseStatsRequestGrpc,
  GetHouseStatsResponseGrpc,
  SuccessResponseGrpc,
  AddUserToHouseByIdRequestGrpc,
  AddUserToHouseByIdResponseGrpc
} from './interfaces/houses-grpc.interface';

interface HousesGrpcServiceObservable {
  createHouse(data: CreateHouseRequestGrpc): Observable<HouseGrpc>;
  findAllHouses(data: FindAllHousesRequestGrpc): Observable<HousesResponseGrpc>;
  findOneHouse(data: FindOneHouseRequestGrpc): Observable<HouseGrpc>;
  findHouseByCode(data: FindHouseByCodeRequestGrpc): Observable<HouseGrpc>;
  updateHouse(data: UpdateHouseRequestGrpc): Observable<HouseGrpc>;
  removeHouse(data: RemoveHouseRequestGrpc): Observable<SuccessResponseGrpc>;
  addUserToHouse(data: AddUserToHouseRequestGrpc): Observable<HouseGrpc>;
  addUserToHouseById(data: AddUserToHouseByIdRequestGrpc): Observable<AddUserToHouseByIdResponseGrpc>;
  removeUserFromHouse(data: RemoveUserFromHouseRequestGrpc): Observable<HouseGrpc>;
  getUsersInHouse(data: GetUsersInHouseRequestGrpc): Observable<GetUsersInHouseResponseGrpc>;
  getHousesByUser(data: GetHousesByUserRequestGrpc): Observable<GetHousesByUserResponseGrpc>;
  isUserInHouse(data: IsUserInHouseRequestGrpc): Observable<IsUserInHouseResponseGrpc>;
  searchHousesByName(data: SearchHousesByNameRequestGrpc): Observable<SearchHousesByNameResponseGrpc>;
  getHouseStats(data: GetHouseStatsRequestGrpc): Observable<GetHouseStatsResponseGrpc>;
  houseExists(data: HouseExistsRequestGrpc): Observable<HouseExistsResponseGrpc>;
}

@Injectable()
export class HousesService implements OnModuleInit {
  private readonly logger = new Logger(HousesService.name);
  private housesService: HousesGrpcServiceObservable;

  constructor(@Inject('MICROSERVICE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.housesService = this.client.getService<HousesGrpcServiceObservable>('HousesService');
  }

  // ==================== MÉTODOS QUE DEVUELVEN OBJETOS SIMPLES PARA GRAPHQL ====================

async createHouse(createHouseData: any): Promise<any> {
  try {
    this.logger.log(`Creating house: ${JSON.stringify(createHouseData)}`);
    
    const request: CreateHouseRequestGrpc = {
      nombre: createHouseData.name || createHouseData.nombre,
      descripcion: createHouseData.description || createHouseData.descripcion || '',
      codigo: createHouseData.code || createHouseData.codigo || '',
      userIds: createHouseData.userIds || []
    };
    
    this.logger.log(`Sending to microservice: ${JSON.stringify(request)}`);
    const result = await this.housesService.createHouse(request).toPromise();
    
    if (!result) {
      throw new Error('No se pudo crear la casa - respuesta vacía del microservicio');
    }
        return this.transformHouseFromGrpc(result);
  } catch (error) {
    this.logger.error(`Error creating house: ${error.message}`, error.stack);
    throw error;
  }
}

  async findAllHouses(findAllHousesData: any): Promise<any> {
    try {
      const request: FindAllHousesRequestGrpc = {
        limit: findAllHousesData.limit || 10,
        offset: findAllHousesData.offset || 0
      };
      
      this.logger.log(`Finding all houses: ${JSON.stringify(request)}`);
      const result = await this.housesService.findAllHouses(request).toPromise();
      

      if (!result || !result.houses) {
        throw new Error('No se encontraron casas o la respuesta del microservicio es inválida');
      }


      return {
        houses: result.houses.map(house => this.transformHouseFromGrpc(house)),
        total: result.total
      };
    } catch (error) {
      this.logger.error(`Error finding houses: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOneHouse(findOneHouseData: any): Promise<any> {
    try {
      const request: FindOneHouseRequestGrpc = {
        id: findOneHouseData.id
      };
      
      this.logger.log(`Finding house by id: ${JSON.stringify(request)}`);
      const result = await this.housesService.findOneHouse(request).toPromise();

      if (!result) {
        throw new Error('No se encontró la casa - respuesta vacía del microservicio');
      }

      return this.transformHouseFromGrpc(result);
    } catch (error) {
      this.logger.error(`Error finding house: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findHouseByCode(codigo: string): Promise<any> {
    try {
      const request: FindHouseByCodeRequestGrpc = { codigo };
      
      this.logger.log(`Finding house by code: ${JSON.stringify(request)}`);
      const result = await this.housesService.findHouseByCode(request).toPromise();
      
      if (!result) {
        throw new Error('No se encontró la casa por código - respuesta vacía del microservicio');
      }
      return this.transformHouseFromGrpc(result);
    } catch (error) {
      this.logger.error(`Error finding house by code: ${error.message}`, error.stack);
      throw error;
    }
  }

  async updateHouse(updateHouseData: any): Promise<any> {
    try {
      const request: UpdateHouseRequestGrpc = {
        id: updateHouseData.id,
        nombre: updateHouseData.name || updateHouseData.nombre,
        descripcion: updateHouseData.description || updateHouseData.descripcion || '',
        codigo: updateHouseData.code || updateHouseData.codigo || '',
        userIds: updateHouseData.userIds || []
      };
      
      this.logger.log(`Updating house: ${JSON.stringify(request)}`);
      const result = await this.housesService.updateHouse(request).toPromise();

      if (!result) {
        throw new Error('No se pudo actualizar la casa - respuesta vacía del microservicio');
      }
      return this.transformHouseFromGrpc(result);
    } catch (error) {
      this.logger.error(`Error updating house: ${error.message}`, error.stack);
      throw error;
    }
  }

  async removeHouse(id: string): Promise<any> {
    try {
      const request: RemoveHouseRequestGrpc = { id };
      
      this.logger.log(`Removing house: ${JSON.stringify(request)}`);
      const result = await this.housesService.removeHouse(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error removing house: ${error.message}`, error.stack);
      throw error;
    }
  }

  async addUserToHouse(code: string): Promise<any> {
    try {
      // Este método parece incompleto, necesitas más parámetros
      throw new Error('addUserToHouse method needs both houseId and userId parameters');
    } catch (error) {
      this.logger.error(`Error adding user to house: ${error.message}`, error.stack);
      throw error;
    }
  }
  
  async addUserToHouseById(houseId: string, userId: string): Promise<any> {
    try {
      const request: AddUserToHouseByIdRequestGrpc = {
        house_id: houseId,
        user_id: userId
      };
      
      this.logger.log(`Adding user to house: ${JSON.stringify(request)}`);
      const result = await this.housesService.addUserToHouseById(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error adding user to house by id: ${error.message}`, error.stack);
      throw error;
    }
  }

  async removeUserFromHouse(houseId: string, userId: string): Promise<any> {
    try {
      const request: RemoveUserFromHouseRequestGrpc = { houseId, userId };
      
      this.logger.log(`Removing user from house: ${JSON.stringify(request)}`);
      const result = await this.housesService.removeUserFromHouse(request).toPromise();
      
      if (!result) {
        throw new Error('No se pudo eliminar el usuario de la casa - respuesta vacía del microservicio');
      }
      return this.transformHouseFromGrpc(result);
    } catch (error) {
      this.logger.error(`Error removing user from house: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getUsersInHouse(houseId: string): Promise<any> {
    try {
      const request: GetUsersInHouseRequestGrpc = { houseId };
      
      this.logger.log(`Getting users in house: ${JSON.stringify(request)}`);
      const result = await this.housesService.getUsersInHouse(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error getting users in house: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getHousesByUser(userId: string): Promise<any> {
    try {
      const request: GetHousesByUserRequestGrpc = { userId };
      
      this.logger.log(`Getting houses by user: ${JSON.stringify(request)}`);
      const result = await this.housesService.getHousesByUser(request).toPromise();
      
      if (!result || !result.houses) {
        throw new Error('No se encontraron casas para el usuario o la respuesta del microservicio es inválida');
      }
      return {
        houses: result.houses.map(house => this.transformHouseFromGrpc(house))
      };
    } catch (error) {
      this.logger.error(`Error getting houses by user: ${error.message}`, error.stack);
      throw error;
    }
  }

  async isUserInHouse(houseId: string, userId: string): Promise<any> {
    try {
      const request: IsUserInHouseRequestGrpc = { houseId, userId };
      
      this.logger.log(`Checking if user is in house: ${JSON.stringify(request)}`);
      const result = await this.housesService.isUserInHouse(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error checking if user is in house: ${error.message}`, error.stack);
      throw error;
    }
  }

  async searchHousesByName(name: string): Promise<any> {
    try {
      const request: SearchHousesByNameRequestGrpc = {
        name,
        limit: 50
      };
      
      this.logger.log(`Searching houses by name: ${JSON.stringify(request)}`);
      const result = await this.housesService.searchHousesByName(request).toPromise();
      
      if (!result || !result.houses) {
        throw new Error('No se encontraron casas por nombre o la respuesta del microservicio es inválida');
      }
      return {
        houses: result.houses.map(house => this.transformHouseFromGrpc(house))
      };
    } catch (error) {
      this.logger.error(`Error searching houses by name: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getHousesStats(): Promise<any> {
    try {
      const request: GetHouseStatsRequestGrpc = {};
      
      this.logger.log('Getting house stats');
      const result = await this.housesService.getHouseStats(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error getting house stats: ${error.message}`, error.stack);
      throw error;
    }
  }

  async houseExists(houseId: string): Promise<any> {
    try {
      const request: HouseExistsRequestGrpc = { id: houseId };
      
      this.logger.log(`Checking if house exists: ${JSON.stringify(request)}`);
      const result = await this.housesService.houseExists(request).toPromise();
      
      return result;
    } catch (error) {
      this.logger.error(`Error checking if house exists: ${error.message}`, error.stack);
      throw error;
    }
  }

  // ==================== MÉTODOS HELPER ====================

  private transformHouseFromGrpc(houseGrpc: HouseGrpc): any {
    return {
      id: houseGrpc.id,
      name: houseGrpc.nombre,        // nombre -> name
      description: houseGrpc.descripcion, // descripcion -> description
      code: houseGrpc.codigo,        // codigo -> code
      userIds: houseGrpc.userIds,
      createdAt: houseGrpc.createdAt,
      updatedAt: houseGrpc.updatedAt
    };
  }
}