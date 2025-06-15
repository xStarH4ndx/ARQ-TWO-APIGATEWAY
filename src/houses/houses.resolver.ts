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

@Resolver(() => House)
export class HousesResolver {
  constructor(private readonly housesService: HousesService) {}

  @Mutation(() => House)
  createHouse(@Args('input') input: CreateHouseInput) {
    return this.housesService.createHouse(input);
  }

  @Query(() => HousesResponse)
  findAllHouses(
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
    @Args('offset', { type: () => Number, nullable: true }) offset?: number,
  ) {
    return this.housesService.findAllHouses({ limit, offset });
  }

  @Query(() => House)
  findOneHouse(@Args('id', { type: () => ID }) id: string) {
    return this.housesService.findOneHouse({ id });
  }

  @Query(() => House)
  findHouseByCode(@Args('code') code: string) {
    return this.housesService.findHouseByCode(code);
  }

  @Mutation(() => House)
  updateHouse(@Args('input') input: UpdateHouseInput) {
    return this.housesService.updateHouse(input);
  }

  @Mutation(() => Boolean)
  removeHouse(@Args('id', { type: () => ID }) id: string) {
    return this.housesService.removeHouse(id);
  }

  @Mutation(() => House)
  addUserToHouse(@Args('input') code: string) {
    return this.housesService.addUserToHouse(code);
  }

  @Mutation(() => House)
  addUserToHouseById(@Args('input') input: AddUserToHouseInput) {
    return this.housesService.addUserToHouseById(input.houseId, input.userId);
  }


  @Mutation(() => House)
  removeUserFromHouse(@Args('input') input: RemoveUserFromHouseInput) {
    return this.housesService.removeUserFromHouse(input.houseId, input.userId);
  }

  @Query(() => GetUsersInHouseResponse)
  getUsersInHouse(@Args('houseId', { type: () => ID }) houseId: string) {
    return this.housesService.getUsersInHouse(houseId);
  }

  @Query(() => [House])
  getHousesByUser(@Args('userId', { type: () => ID }) userId: string) {
    return this.housesService.getHousesByUser(userId);
  }

  @Query(() => IsUserInHouseResponse)
  isUserInHouse(
    @Args('houseId', { type: () => ID }) houseId: string,
    @Args('userId', { type: () => ID }) userId: string,
  ) {
    return this.housesService.isUserInHouse(houseId, userId);
  }

  @Query(() => HouseExistsResponse)
  houseExists(@Args('houseId', { type: () => ID }) houseId: string) {
    return this.housesService.houseExists(houseId);
  }

  @Query(() => [House])
  searchHousesByName(@Args('input') name: string) {
    return this.housesService.searchHousesByName(name);
  }

  @Query(() => GetHouseStatsResponse)
  getHouseStats() {
    return this.housesService.getHousesStats();
  }
}
