import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  placeOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.placeOrder(createOrderDto);
  }
}
