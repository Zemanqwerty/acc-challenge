import { Events } from 'src/event/event.entity';
import { Users } from 'src/users/users.entity';
import { OneToOne, JoinColumn, ManyToMany, JoinTable, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Participants {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.participants)
  user: Users;

  @ManyToOne(() => Events, (event) => event.participants)
  event: Events;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}