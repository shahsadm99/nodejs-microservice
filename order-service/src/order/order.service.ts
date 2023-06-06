import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/order.dto';
import axios from 'axios';
import { InventoryResponse } from './dto/inventory.dto';
import { CreateOrderLineDto } from './dto/orderLine.dto';
import { OrderLine } from './orderLine.entity';
import { v4 as uuidv4 } from 'uuid';
//import { Tracer } from '@nestjs/core';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>, //private readonly tracer: Tracer,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
/*
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }
*/
  async placeOrder(orderRequest: CreateOrderDto): Promise<string> {
    const order = new Order();
    order.orderNumber = uuidv4();

    const orderLineItems = orderRequest.orderLineList.map(this.mapToDto);
    order.orderLineItemsList = orderLineItems;

    const items = order.orderLineItemsList.map(
      (orderLineItems) => orderLineItems.item,
    );

    /*const inventoryServiceLookup = this.tracer.startSpan(
      'InventoryServiceLookup',
    );*/

    // Make HTTP request to inventory-service using Axios
    const response = await axios.get('http://localhost:9005/inventory', {
      params: {
        item: items,
      },
    });

    const inventoryResponsArray: InventoryResponse[] = response.data;

    const allProductsInStock = inventoryResponsArray.every(
      (inventoryResponse) => inventoryResponse.isInStock,
    );

    if (allProductsInStock) {
      await this.orderRepository.save(order);
      // Perform Kafka-related operations here
      return 'Order Placed Successfully';
    } else {
      throw new Error('Product Not In Stock, Please Try Again');
    }
  }

  private mapToDto(orderLineItemsDto: CreateOrderLineDto): OrderLine {
    const orderLineItems = new OrderLine();
    orderLineItems.price = orderLineItemsDto.price;
    orderLineItems.quantity = orderLineItemsDto.quantity;
    orderLineItems.item = orderLineItemsDto.item;
    return orderLineItems;
  }
}
