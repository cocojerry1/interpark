// src/concert/concert.controller.ts
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { RolesGuard } from 'src/auth/roles.guard';
  import { Roles } from 'src/auth/roles.decorator';
  import { Role } from 'src/user/types/userRole.type';
  import { ConcertService } from './concert.service';
  import { CreateConcertDto } from './dto/CreateConcertDto';
  import { Concert } from './entities/concert.entitiy';
  
  @Controller('concerts')
  @UseGuards(RolesGuard)
  export class ConcertController {
    constructor(private readonly concertService: ConcertService) {}
  
    @Get()
    findAll(@Query('name') name?: string): Promise<Concert[]> {
      return this.concertService.findAll(name);
    }
  
    @Get(':id')
    findOne(@Param('id') id: number): Promise<Concert> {
      return this.concertService.findOne(id);
    }
  
    @Roles(Role.Admin)
    @Post()
    create(@Body() createConcertDto: CreateConcertDto): Promise<Concert> {
      return this.concertService.create(createConcertDto);
    }
  
    @Post('search')
    search(@Query('name') name: string): Promise<Concert[]> {
      return this.concertService.search(name);
    }
  }
  


 