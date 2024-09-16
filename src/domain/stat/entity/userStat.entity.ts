import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userStat')
export class UserStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  createdAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
