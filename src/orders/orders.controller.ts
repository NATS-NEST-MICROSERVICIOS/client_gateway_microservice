import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/pagination-order.dto';
import { CreateItemOrderDto } from './dto/create-item-order.dto';
import { NATS_SERVICE } from 'src/config/services';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return await this.client.send('createOrder', createOrderDto);
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    //console.log(orderPaginationDto);
    return this.client.send('findAllOrders', orderPaginationDto);
  } 

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const order = await firstValueFrom(this.client.send('findOneOrder', +id));
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log({ id, ...updateOrderDto });

    return this.client.send('changeOrderStatus', {
      id,
      ...updateOrderDto,
    });
  }
}
