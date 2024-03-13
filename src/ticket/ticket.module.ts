import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';


import { Point } from 'src/point/entities/point.entity';
import { Concert } from 'src/concert/entities/concert.entitiy';
import { User } from 'src/user/entities/user.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';




@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User,Point,Concert,Ticket]),
  ],
  providers: [TicketService],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule {}