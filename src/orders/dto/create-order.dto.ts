import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { Type } from 'class-transformer';
import { CreateItemOrderDto } from './create-item-order.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemOrderDto)
  items: CreateItemOrderDto[];

  /* @IsPositive()
  @IsNumber()
  totalAmount: number;

  @IsPositive()
  @IsNumber()
  totalItems: number;

  @IsEnum(OrderStatusList, {
    message: `Invalid status ${OrderStatusList}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  @IsBoolean()
  paid: boolean = false; */
}
