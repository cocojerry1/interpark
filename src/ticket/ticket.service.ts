import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity'; 

import { Point } from 'src/point/entities/point.entity'; 
import { Concert } from 'src/concert/entities/concert.entitiy';
import { Reservation } from './tpyes/ticKet.type';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
    @InjectRepository(Point) 
    private readonly pointRepository: Repository<Point>, 
  ) {}

  async bookConcert(userId: number, concertId: number): Promise<Ticket> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const concert = await this.concertRepository.findOne({ where: { id: concertId } });

    if (!user) throw new NotFoundException('해당되는 유저가 없습니다.');
    if (!concert) throw new NotFoundException('해당하는 콘서트가 없습니다.');


    const userPoints = await this.pointRepository.find({ where: { userId: userId } });
    let totalPoints = 0
    for (const point of userPoints) {
      totalPoints += point.possession
    }
    // const totalPoints = userPoints.reduce((acc, point) => acc + point.possession, 0);
    console.log(1,totalPoints)
 
    if (totalPoints < concert.seatPrice) {
      throw new BadRequestException('잔액이부족합니다.');
    }


    let remainingSeatPrice = concert.seatPrice;
    for (const point of userPoints) {
      if (point.possession >= remainingSeatPrice) {
        // console.log(1,point)
        point.possession -= remainingSeatPrice;
        await this.pointRepository.save(point);
        break; 
      } else {
        remainingSeatPrice -= point.possession;
        point.possession = 0;
        await this.pointRepository.save(point);
        
      }
    }


    const ticket = this.ticketRepository.create({
      userId: user.id,
      concertId: concert.id,
      reservation: Reservation.y,
    });

    await this.ticketRepository.save(ticket);

    return ticket;
  }
  
  async getBookingHistory(userId: number): Promise<Ticket[]> {
    const tickets = await this.ticketRepository.find({
      where: { userId },
      relations: ['concert'], 
      order: { createdAt: 'DESC' },
    });
  
    if (!tickets.length) throw new NotFoundException('No bookings found for this user.');
  
    return tickets;
  }
  
  

}