import { Events } from 'src/event/event.entity';
import { Participants } from 'src/participant/participant.entity';
import { OneToOne, JoinColumn, ManyToMany, JoinTable, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false
  })
  telegram_id: string;

  @Column({
    nullable: false
  })
  telegram_username: string

  @OneToMany(() => Events, (event) => event.user, {cascade: true})
  events: Events[]

  @OneToMany(() => Participants, (participant) => participant.user)
  participants: Participants[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}