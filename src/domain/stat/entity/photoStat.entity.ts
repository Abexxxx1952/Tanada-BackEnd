import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from '../../photo/entity/photo.entity';

@Entity('photoStat')
export class PhotoStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  created?: number;

  @Column({ nullable: true })
  viewsCount?: number;

  @Column({ nullable: true })
  deleted?: number;

  @Column()
  photoId: number;

  @OneToOne(() => PhotoEntity, (photo) => photo.stats)
  @JoinColumn({ name: 'photoId' })
  photo: PhotoEntity;
}
