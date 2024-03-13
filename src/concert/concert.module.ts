import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { Concert } from './entities/concert.entitiy';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concert,Ticket])],
  providers: [ConcertService],
  controllers: [ConcertController]
})
export class ConcertModule {}


