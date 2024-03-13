import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Reservation } from '../tpyes/ticKet.type';
import { Concert } from 'src/concert/entities/concert.entitiy';
import { Point } from 'src/point/entities/point.entity';

@Entity({
  name: 'ticket',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', select: false, nullable: false })
  possession: number;
  @Column({ type: 'enum', enum: Reservation, default:Reservation.n  })
  reservation: Reservation;
  @CreateDateColumn()
  createdAt: Date;
  @Column('int', { name: 'userId', select: false, nullable: false })
  userId: number;
  @Column('int', { name: 'ticketId', select: false, nullable: false })
  ticketId: number | null;
  @Column('int', { name: 'concertId', select: false, nullable: false })
  concertId: number | null;
  @Column({ type: 'int', select: false, nullable: false })
  price: number;


  @ManyToOne(() => User, (user) => user.ticket)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.ticket) 
  @JoinColumn([{ name: 'concertId', referencedColumnName: 'id' }])
  concert: Concert;

  @ManyToOne(() => Point, (point) => point.ticket)
  @JoinColumn([{ name: 'pointId', referencedColumnName: 'id' }])
  point: Point;
}