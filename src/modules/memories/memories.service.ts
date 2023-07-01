import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMemoryDto } from './dto/create-memory.dto'
import { UpdateMemoryDto } from './dto/update-memory.dto'
import { MemoriesRepository } from './repositories/memories.repository'
import { v2 as cloudinary } from 'cloudinary'
import { unlink } from 'fs'

@Injectable()
export class MemoriesService {
  constructor(private memoriesRepository: MemoriesRepository) {}

  async create(createMemoryDto: CreateMemoryDto, userId: string) {
    const newMemory = await this.memoriesRepository.create(
      createMemoryDto,
      userId,
    )
    return newMemory
  }

  async findAllByOwner(ownerId: string) {
    const memories = await this.memoriesRepository.findAllByOwner(ownerId)
    return memories
  }

  async findAll() {
    const memories = await this.memoriesRepository.findAll()
    return memories
  }

  async findOne(id: string) {
    const memory = await this.memoriesRepository.findOne(id)
    return memory
  }

  async update(id: string, updateMemoryDto: UpdateMemoryDto) {
    const memory = await this.memoriesRepository.update(id, updateMemoryDto)
    return memory
  }

  // eslint-disable-next-line no-undef
  async upload(id: string, coverImage: Express.Multer.File) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    })

    const findMemory = await this.memoriesRepository.findOne(id)

    if (!findMemory) {
      throw new NotFoundException('Memory not found')
    }

    const uploadedImage = await cloudinary.uploader.upload(
      coverImage.path,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          throw new NotFoundException('Image not found')
        }
        return result
      },
    )
    console.log(uploadedImage)
    const updatedMemory = await this.memoriesRepository.update(id, {
      ...UpdateMemoryDto,
      coverImage: uploadedImage.secure_url,
    })

    unlink(coverImage.path, (err) => {
      if (err) {
        console.log(err)
      }
    })

    return updatedMemory
  }

  async delete(id: string) {
    const memory = await this.memoriesRepository.delete(id)
    return memory
  }
}
