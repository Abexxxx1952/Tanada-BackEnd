import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoEntity } from '../../photo/entity/photo.entity';
import { PhotoViewEntity } from './photoView.entity';

@Entity('photoStat')
export class PhotoStatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  viewsCount?: number;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true })
  photoId?: number;

  @OneToOne(() => PhotoEntity, (photo) => photo.stats)
  @JoinColumn({ name: 'photoId' })
  photo: PhotoEntity;

  @OneToMany(() => PhotoViewEntity, (view) => view.photoStat)
  views: PhotoViewEntity[];
}
