import { Ticket } from 'src/ticket/entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
  name: 'point',
})
export class Point {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int',  nullable: false })
  possession: number;
  @Column({ type: 'varchar',  nullable: false })
  history: string;
  @CreateDateColumn()
  createdAt: Date;
  @Column('int', { name: 'userId', nullable: false })
  userId: number;
  @Column('int', { name: 'ticketId',  nullable: true })
  ticketId: number | null;

  @ManyToOne(() => User, (user) => user.point)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Ticket, (ticket) => ticket.point)
  @JoinColumn([{ name: 'ticketId', referencedColumnName: 'id' }])
  ticket: Ticket;
}