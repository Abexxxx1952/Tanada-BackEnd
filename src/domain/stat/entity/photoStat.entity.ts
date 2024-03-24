import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PhotoEntity } from 'src/domain/photo/entity/photo.entity';

@Entity('photoStat')
export class PhotoStatEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty()
  created?: number;

  @Column({ nullable: true })
  @ApiProperty()
  viewsCount?: number;

  @Column({ nullable: true })
  @ApiProperty()
  deleted?: number;

  @Column()
  @ApiProperty()
  photoId: number;

  @OneToOne(() => PhotoEntity, (photo) => photo.stats)
  @JoinColumn({ name: 'photoId' })
  @ApiProperty({
    type: () => PhotoEntity,
  })
  photo: PhotoEntity;
}
