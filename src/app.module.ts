import { Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { MemoriesModule } from './modules/memories/memories.module'
import { AuthModule } from './modules/auth/auth.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { ProductsModule } from './modules/products/products.module'

@Module({
  imports: [
    UsersModule,
    MemoriesModule,
    AuthModule,
    TasksModule,
    ProductsModule,
  ],
})
export class AppModule {}
