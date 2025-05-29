import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { InventoryService } from './Inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('productos')
  async crearProducto(@Body() productoDto: any) {
    return this.inventoryService.crearProducto(productoDto);
  }

  @Get('productos/:id')
  async obtenerProducto(@Param('id') id: string) {
    return this.inventoryService.obtenerProducto(id);
  }

  // ... otros endpoints
}