import { CreateOrderLineDto } from './orderLine.dto';

export class CreateOrderDto {
  orderNumber: string;
  orderLineList: CreateOrderLineDto[];
}
