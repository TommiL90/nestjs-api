import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { MemoriesService } from './memories.service'
import { CreateMemoryDto } from './dto/create-memory.dto'
import { UpdateMemoryDto } from './dto/update-memory.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { Request as ExpressRequest } from 'express'

interface RequestWithUser extends ExpressRequest {
  user: {
    id: string
    email: string
    isAdmin: boolean
  }
}

@ApiTags('Memories')
@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createMemoryDto: CreateMemoryDto,
    @Request() req: RequestWithUser,
  ) {
    return this.memoriesService.create(createMemoryDto, req.user.id)
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findAllByOwner(@Request() req: RequestWithUser) {
    return this.memoriesService.findAllByOwner(req.user.id)
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.memoriesService.findOne(id)
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMemoryDto: UpdateMemoryDto) {
    return this.memoriesService.update(id, updateMemoryDto)
  }

  @Patch('upload/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'coverImage', maxCount: 1 }]))
  upload(
    // eslint-disable-next-line no-undef
    @UploadedFiles() files: { coverImage?: Express.Multer.File[] },
    @Param('id') id: string,
  ) {
    const { coverImage } = files
    return this.memoriesService.upload(id, coverImage[0])
  }

  // @Roles(UserRole.Admin, UserRole.User)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.memoriesService.delete(id)
  }
}
