import { BadRequestException, Module } from '@nestjs/common'
import { MemoriesService } from './memories.service'
import { MemoriesController } from './memories.controller'
import { MemoriesRepository } from './repositories/memories.repository'
import { MemoriesPrismaRepository } from './repositories/prisma/memories.prisma.repository'
import { PrismaService } from 'src/database/prisma.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './temp',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`)
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          cb(null, true)
        } else {
          cb(new BadRequestException('File is not an image'), false)
        }
      },
    }),
  ],
  controllers: [MemoriesController],
  providers: [
    MemoriesService,
    PrismaService,
    {
      provide: MemoriesRepository,
      useClass: MemoriesPrismaRepository,
    },
  ],
})
export class MemoriesModule {}
