import { Participants } from 'src/participant/participant.entity';
import { Users } from 'src/users/users.entity';
import { OneToOne, JoinColumn, ManyToMany, JoinTable, Entity, Column, PrimaryGeneratedColumn, Generated, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false
  })
  title: string

  @Column({
    nullable: true
  })
  description: string

  @Column({
    nullable: false,
    type: 'timestamp'
  })
  startTime: Date

  @ManyToOne(() => Users, (user) => user.events)
  user: Users;

  @OneToMany(() => Participants, (participant) => participant.event)
  participants: Participants[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}