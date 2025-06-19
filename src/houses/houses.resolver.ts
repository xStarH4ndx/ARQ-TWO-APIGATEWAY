import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { HousesService } from './houses.service';
import { House } from './models/house.model';
import { CreateHouseInput } from './dto/create-house.input';
import { UpdateHouseInput } from './dto/update-house.input';
import { HousesResponse } from './models/houses-response.model';
import { GetHouseStatsResponse } from './models/house-stats.model';
import { AddUserToHouseInput } from './dto/add-user-to-house.input';
import { RemoveUserFromHouseInput } from './dto/remove-user-from-house.input';
import { GetUsersInHouseResponse } from './models/get-users-in-house.model';
import { IsUserInHouseResponse } from './models/is-user-in-house.model';
import { HouseExistsResponse } from './models/house-exists.model';
import { SearchHousesByNameInput } from './dto/search-houses-by-name.input';
import { Logger } from '@nestjs/common';
//Falta Auth
@Resolver(() => House)
export class HousesResolver {
  private readonly logger = new Logger(HousesResolver.name);
  
  constructor(private readonly housesService: HousesService) {}

  @Mutation(() => House)
  async createHouse(@Args('input') input: CreateHouseInput): Promise<House> {
    try {
      this.logger.log(`GraphQL createHouse: ${JSON.stringify(input)}`);
      return await this.housesService.createHouse(input);
    } catch (error) {
      this.logger.error(`GraphQL createHouse error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => HousesResponse)
  async findAllHouses(
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
    @Args('offset', { type: () => Number, nullable: true }) offset?: number,
  ): Promise<HousesResponse> {
    try {
      this.logger.log(`GraphQL findAllHouses: limit=${limit}, offset=${offset}`);
      return await this.housesService.findAllHouses({ limit, offset });
    } catch (error) {
      this.logger.error(`GraphQL findAllHouses error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => House)
  async findOneHouse(@Args('id') id: string): Promise<House> {
    try {
      this.logger.log(`GraphQL findOneHouse: id=${id}`);
      return await this.housesService.findOneHouse({ id });
    } catch (error) {
      this.logger.error(`GraphQL findOneHouse error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => House)
  async findHouseByCode(@Args('code') codigo: string): Promise<House> {
    try {
      this.logger.log(`GraphQL findHouseByCode: code=${codigo}`);
      return await this.housesService.findHouseByCode(codigo);
    } catch (error) {
      this.logger.error(`GraphQL findHouseByCode error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => House)
  async updateHouse(@Args('input') input: UpdateHouseInput): Promise<House> {
    try {
      this.logger.log(`GraphQL updateHouse: ${JSON.stringify(input)}`);
      return await this.housesService.updateHouse(input);
    } catch (error) {
      this.logger.error(`GraphQL updateHouse error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  async removeHouse(@Args('id') id: string): Promise<boolean> {
    try {
      this.logger.log(`GraphQL removeHouse: id=${id}`);
      const result = await this.housesService.removeHouse(id);
      return result.success;
    } catch (error) {
      this.logger.error(`GraphQL removeHouse error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => House)
  async addUserToHouse(@Args('houseId') houseId: string, @Args('userId') userId: string): Promise<House> {
    try {
      this.logger.log(`GraphQL addUserToHouse: houseId=${houseId}, userId=${userId}`);
      const result = await this.housesService.addUserToHouseById(houseId, userId);
      if (result.success) {
        return await this.housesService.findOneHouse({ id: houseId });
      } else {
        throw new Error(result.message || 'Failed to add user to house');
      }
    } catch (error) {
      this.logger.error(`GraphQL addUserToHouse error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => House)
  async addUserToHouseById(@Args('input') input: AddUserToHouseInput): Promise<House> {
    try {
      this.logger.log(`GraphQL addUserToHouseById: ${JSON.stringify(input)}`);
      const result = await this.housesService.addUserToHouseById(input.houseId, input.userId);
      if (result.success) {
        return await this.housesService.findOneHouse({ id: input.houseId });
      } else {
        throw new Error(result.message || 'Failed to add user to house');
      }
    } catch (error) {
      this.logger.error(`GraphQL addUserToHouseById error: ${error.message}`);
      throw error;
    }
  }

  @Mutation(() => House)
  async removeUserFromHouse(@Args('input') input: RemoveUserFromHouseInput): Promise<House> {
    try {
      this.logger.log(`GraphQL removeUserFromHouse: ${JSON.stringify(input)}`);
      return await this.housesService.removeUserFromHouse(input.houseId, input.userId);
    } catch (error) {
      this.logger.error(`GraphQL removeUserFromHouse error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => GetUsersInHouseResponse)
  async getUsersInHouse(@Args('houseId', { type: () => ID }) houseId: string): Promise<GetUsersInHouseResponse> {
    try {
      this.logger.log(`GraphQL getUsersInHouse: houseId=${houseId}`);
      return await this.housesService.getUsersInHouse(houseId);
    } catch (error) {
      this.logger.error(`GraphQL getUsersInHouse error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => [House])
  async getHousesByUser(@Args('userId', { type: () => ID }) userId: string): Promise<House[]> {
    try {
      this.logger.log(`GraphQL getHousesByUser: userId=${userId}`);
      const result = await this.housesService.getHousesByUser(userId);
      return result.houses;
    } catch (error) {
      this.logger.error(`GraphQL getHousesByUser error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => IsUserInHouseResponse)
  async isUserInHouse(
    @Args('houseId', { type: () => ID }) houseId: string,
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<IsUserInHouseResponse> {
    try {
      this.logger.log(`GraphQL isUserInHouse: houseId=${houseId}, userId=${userId}`);
      return await this.housesService.isUserInHouse(houseId, userId);
    } catch (error) {
      this.logger.error(`GraphQL isUserInHouse error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => HouseExistsResponse)
  async houseExists(@Args('houseId', { type: () => ID }) houseId: string): Promise<HouseExistsResponse> {
    try {
      this.logger.log(`GraphQL houseExists: houseId=${houseId}`);
      return await this.housesService.houseExists(houseId);
    } catch (error) {
      this.logger.error(`GraphQL houseExists error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => [House])
  async searchHousesByName(@Args('name') name: string): Promise<House[]> {
    try {
      this.logger.log(`GraphQL searchHousesByName: name=${name}`);
      const result = await this.housesService.searchHousesByName(name);
      return result.houses;
    } catch (error) {
      this.logger.error(`GraphQL searchHousesByName error: ${error.message}`);
      throw error;
    }
  }

  @Query(() => GetHouseStatsResponse)
  async getHouseStats(): Promise<GetHouseStatsResponse> {
    try {
      this.logger.log('GraphQL getHouseStats');
      return await this.housesService.getHousesStats();
    } catch (error) {
      this.logger.error(`GraphQL getHouseStats error: ${error.message}`);
      throw error;
    }
  }
}