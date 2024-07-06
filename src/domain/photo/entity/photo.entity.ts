import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../user/entity/user.entity';
import { PhotoStatEntity } from '../../stat/entity/photoStat.entity';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.photo, { cascade: true })
  user: UserEntity;

  @OneToOne(() => PhotoStatEntity, (stats) => stats.photo, {
    eager: true,
  })
  stats: PhotoStatEntity;
}
