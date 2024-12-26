import { PaginationDto } from 'src/common/pagination.dto';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Status must be one of ${Object.values(OrderStatusList)}`,
  })
  status: OrderStatus;
}
