import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface HousesGrpcService {
  createHouse(data: any): Promise<any>;
  findAllHouses(data: any): Promise<any>;
  findOneHouse(data: any): Promise<any>;
  findHouseByCode(data: any): Promise<any>;
  updateHouse(data: any): Promise<any>;
  removeHouse(data: any): Promise<any>;
  addUserToHouse(data: any): Promise<any>;
  addUserToHouseById(data: any): Promise<any>;
  removeUserFromHouse(data: any): Promise<any>;
  getUsersInHouse(data: any): Promise<any>;
  getHousesByUser(data: any): Promise<any>;
  isUserInHouse(data: any): Promise<any>;
  searchHousesByName(data: any): Promise<any>;
  getHousesStats(data: any): Promise<any>;
  houseExists(data: any): Promise<any>;
}

@Injectable()
export class HousesService implements OnModuleInit {
  private housesService: HousesGrpcService;

  constructor(@Inject('MICROSERVICE_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.housesService = this.client.getService<HousesGrpcService>('HousesService');
  }

  // Métodos que exponen las funcionalidades del microservicio
  async createHouse(createHouseData: any) {
    return this.housesService.createHouse(createHouseData);
  }

  async findAllHouses(findAllHousesData: any) {
    return this.housesService.findAllHouses(findAllHousesData);
  }

  async findOneHouse(findOneHouseData: any) {
    return this.housesService.findOneHouse(findOneHouseData);
  }

  async addUserToHouse(code: string) {
    return this.housesService.addUserToHouse(code);
  }
  
  async addUserToHouseById(houseId: string, userId: string) {
    return this.housesService.addUserToHouseById({ houseId, userId });
  }

  async getHousesStats() {
    return this.housesService.getHousesStats({});
  }

    async removeHouse(id: string) {
        return this.housesService.removeHouse({ id });
    }  

    async findHouseByCode(code: string) {
        return this.housesService.findHouseByCode({ code });
    }

    async removeUserFromHouse(houseId: string, userId: string) {
        return this.housesService.removeUserFromHouse({ houseId, userId });
    }

    async getUsersInHouse(houseId: string) {
        return this.housesService.getUsersInHouse({ houseId });
    }

    async getHousesByUser(userId: string) {
        return this.housesService.getHousesByUser({ userId });
    }

    async isUserInHouse(houseId: string, userId: string) {
        return this.housesService.isUserInHouse({ houseId, userId });
    }

    async searchHousesByName(name: string) {
        return this.housesService.searchHousesByName({ name });
    }

    async updateHouse(updateHouseData: any) {
        return this.housesService.updateHouse(updateHouseData);
    }

    async houseExists(houseId: string) {
        return this.housesService.houseExists({ houseId });
    }
    
}