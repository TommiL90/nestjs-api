// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Request,
// } from '@nestjs/common'
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'
// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
// import { CreateTaskDto } from './dto/create-task.dto'
// import { UpdateTaskDto } from './dto/update-task.dto'
// import { TasksService } from './tasks.service'

// @ApiTags('Tasks')
// @Controller('tasks')
// export class TasksController {
//   constructor(private readonly tasksService: TasksService) {}

//   @Post('')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
//     console.log(createTaskDto, req.user.id)
//     return this.tasksService.create(createTaskDto, req.user.id)
//   }

//   @Get('')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   findAllByOwner(@Request() req) {
//     return this.tasksService.findTasksbyOwner(req.user.id)
//   }

//   @Get(':id')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   findOne(@Param('id') id: string) {
//     return this.tasksService.findOne(id)
//   }

//   @Patch(':id')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   update(@Param('id') id: string, @Body() updateMemoryDto: UpdateTaskDto) {
//     return this.tasksService.update(id, updateMemoryDto)
//   }

//   @Delete(':id')
//   @ApiBearerAuth()
//   @UseGuards(JwtAuthGuard)
//   delete(@Param('id') id: string) {
//     return this.tasksService.remove(id)
//   }
// }
