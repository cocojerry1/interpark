import { Column, CreateDateColumn, DeleteDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Role } from '../types/userRole.type';
import { Point } from 'src/point/entities/point.entity';
import { Concert } from 'src/concert/entities/concert.entitiy';
import { Ticket } from 'src/ticket/entities/ticket.entity';
@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;
  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;
  @Column({ type: 'varchar', select: true, nullable: false })
  name: string;
  @Column({ type: 'varchar', select: true, nullable: false })
  nickname: string;
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;
  @Column({ type: 'varchar', select: true, nullable: false })
  Introduce: string;
  
  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany((type) => Point, (point) => point.user)
  point: Point;

  @OneToMany((type) => Concert, (concert) => concert.user)
  concert: Concert[];

  @OneToMany((type) => Ticket, (ticket) => ticket.user)
  ticket: Ticket[];
}