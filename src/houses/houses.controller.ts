import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { HousesService } from './houses.service';
//ESTO NO SE USA PERO MEJOR QUE SOBRE A QUE FALTE

@Controller('houses')
export class HousesController {
  constructor(private readonly housesService: HousesService) {}

  @Post()
  async createHouse(@Body() createHouseDto: any) {
    return this.housesService.createHouse(createHouseDto);
  }

  @Get()
  async findAllHouses(@Query() query: any) {
    return this.housesService.findAllHouses(query);
  }

  @Get('stats')
  async getHousesStats() {
    return this.housesService.getHousesStats();
  }

  @Get(':id')
  async findOneHouse(@Param('id') id: string) {
    return this.housesService.findOneHouse({ id });
  }

  @Post(':houseId/users/:userId')
  async addUserToHouse(
    @Param('code') code: string
  ) {
    return this.housesService.addUserToHouse(code);
  }

  @Get(':houseId/code')
  async findHouseByCode(@Param('code') code: string) {
    return this.housesService.findHouseByCode(code);
  }

  @Put(':id')
  async updateHouse(@Param('id') id: string, @Body() updateHouseDto: any) {
    return this.housesService.updateHouse({ id, ...updateHouseDto });
  }

    @Delete(':id')
        remove(@Param('id') id: string) {
        return this.housesService.removeHouse(id);
    }

    @Post(':houseId/users/:userId')
        addUserToHouseById(@Param('houseId') houseId: string, @Param('userId') userId: string) {
        return this.housesService.addUserToHouseById(houseId, userId);
    }

    @Delete(':houseId/users/:userId')
        removeUserFromHouse(@Param('houseId') houseId: string, @Param('userId') userId: string) {
        return this.housesService.removeUserFromHouse(houseId, userId);
    }

    @Get(':houseId/users')
        getUsersInHouse(@Param('houseId') houseId: string) {
        return this.housesService.getUsersInHouse(houseId);
    }

    @Get('/by-user/:userId')
        getHousesByUser(@Param('userId') userId: string) {
        return this.housesService.getHousesByUser(userId);
    }

    @Get(':houseId/users/:userId/exists')
        isUserInHouse(@Param('houseId') houseId: string, @Param('userId') userId: string) {
        return this.housesService.isUserInHouse(houseId, userId);
    }

    @Get('/search')
        searchHousesByName(@Query('name') name: string) {
        return this.housesService.searchHousesByName(name);
    }

    @Get(':houseId/exists')
        houseExists(@Param('houseId') houseId: string) {
        return this.housesService.houseExists(houseId);
    }

    @Get(':houseId/users/:userId')
    getUserInHouse(@Query('houseId') houseId: string, @Query('userId') userId: string) {
        return this.housesService.isUserInHouse(houseId, userId);
    }
    
}