import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order } from './entities/order.entity'
import { Request as ExpressRequest } from 'express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UserRole } from 'src/common/role.enum'
import { Roles } from '../auth/roles.decorator'
import { RolesGuard } from '../auth/roles.guard'

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string
    email: string
  }
}

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req: RequestWithUser,
  ): Promise<Order> {
    return this.ordersService.createOrderWithProducts(
      createOrderDto,
      req.user.id,
    )
  }

  @Get()
  @ApiBearerAuth()
  @Roles(UserRole.Admin, UserRole.Employee)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(id)
  }
}
