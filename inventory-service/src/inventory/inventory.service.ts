import { Injectable } from '@nestjs/common';
import { CreateInventoryDto, InventoryResponse } from './dto/inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async isInStock(item: string[]): Promise<InventoryResponse[]> {
    const inventories = await this.inventoryRepository.find({
      where: { item: In(item) },
    });

    return inventories.map((inventory) => ({
      item: inventory.item,
      isInStock: inventory.quantity > 0,
    }));
  }
  /*
  async isInStock(item: string[]): Promise<InventoryResponse[]> {
    return ;
  }*/

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const inventory = this.inventoryRepository.create(createInventoryDto);
    return this.inventoryRepository.save(inventory);
  }
}
