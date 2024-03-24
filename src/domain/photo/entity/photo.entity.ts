import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../user/entity/user.entity';
import { PhotoStatEntity } from 'src/domain/stat/entity/photoStat.entity';

@Entity('photo')
export class PhotoEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  link: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.photo, { cascade: true })
  @ApiProperty({
    type: () => UserEntity,
  })
  user: UserEntity;

  @OneToOne(() => PhotoStatEntity, (stats) => stats.photo, {
    eager: true,
  })
  @ApiProperty({
    type: () => PhotoStatEntity,
  })
  stats: PhotoStatEntity;
}
