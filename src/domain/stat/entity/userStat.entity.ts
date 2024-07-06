import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userStat')
export class UserStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  created?: number;

  @Column({ nullable: true })
  deleted?: number;
}
