import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoStatEntity } from './photoStat.entity';

@Entity('photoView')
export class PhotoViewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  viewedAt: Date;

  @Column()
  photoStatId: number;

  @ManyToOne(() => PhotoStatEntity, (photoStat) => photoStat.views)
  @JoinColumn({ name: 'photoStatId' })
  photoStat: PhotoStatEntity;
}
