import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateInventoryDto, InventoryResponse } from './dto/inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}
  @Get()
  isInStock(@Query('item') item: string[]) {
    return this.inventoryService.isInStock(item);
  }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }
}
