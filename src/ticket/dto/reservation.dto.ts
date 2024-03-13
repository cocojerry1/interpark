// src/ticket/dto/book-concert.dto.ts

import { IsInt, IsNotEmpty } from 'class-validator';

export class ReservationConcertDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  concertId: number;
}


