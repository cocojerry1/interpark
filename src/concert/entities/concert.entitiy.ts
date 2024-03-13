import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../types/conCert.type';
import { User } from 'src/user/entities/user.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Entity({
  name: 'concerts',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column('json', {array:false})
  dates: Date[];

  @Column({ type: 'varchar', nullable: false })
  seat: any;

  @Column({ type: 'varchar', nullable: true, default: 30000  })
  seatPrice: number;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'varchar', nullable: false })
  imgUrl: string;


  @Column({ type: 'enum', enum: Category, default: Category.Jazz })
  category: Category;

  @ManyToOne(() => User, (user) => user.concert)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.concert)
  @JoinColumn([{ name: 'ticketId', referencedColumnName: 'id' }])
  ticket: Ticket;

}