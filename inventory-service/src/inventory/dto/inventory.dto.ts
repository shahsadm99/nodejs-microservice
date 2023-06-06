export class CreateInventoryDto {
  item: string;

  price: number;

  quantity: number;
}

export class InventoryResponse {
  item: string;

  isInStock: boolean;

}
