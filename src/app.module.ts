import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { MemoriesModule } from './modules/memories/memories.module'
import { AuthModule } from './modules/auth/auth.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { ProductsModule } from './modules/products/products.module'
import { CategoriesModule } from './modules/categories/categories.module'
import { OrdersModule } from './modules/orders/orders.module'
import { ProductsOrderModule } from './modules/products-orders/product-order.module'
import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      // host: 'containers-us-west-150.railway.app',
      // port: '7184',
      // username: 'default',
      // password: 'H7j4FsiDpMvYvxpCFBD5',
      url: 'redis://:kZ0387PYh6C2@sfo1.clusters.zeabur.com:31095',
    }),
    UsersModule,
    MemoriesModule,
    AuthModule,
    TasksModule,
    ProductsModule,
    CategoriesModule,
    ProductsOrderModule,
    OrdersModule,
  ],
})
export class AppModule {}
