import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @UpdateDateColumn({ nullable: true })
  updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.photo, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToOne(() => PhotoStatEntity, (stats) => stats.photo, {
    eager: true,
  })
  stats: PhotoStatEntity;
}
