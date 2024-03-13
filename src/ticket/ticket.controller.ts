// src/ticket/ticket.controller.ts

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';

import { Ticket } from './entities/ticket.entity';
import { ReservationConcertDto } from './dto/reservation.dto';


@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('book')
  async bookConcert(@Body() reservationConcertDto: ReservationConcertDto): Promise<Ticket> {
    return this.ticketService.bookConcert(reservationConcertDto.userId, reservationConcertDto.concertId);
  }

  @Get('history/:userId')
  async getBookingHistory(@Param('userId') userId: number): Promise<Ticket[]> {
    return this.ticketService.getBookingHistory(userId);
  }
}
