import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MemoriesModule } from './modules/memories/memories.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, MemoriesModule, AuthModule],
})
export class AppModule {}
