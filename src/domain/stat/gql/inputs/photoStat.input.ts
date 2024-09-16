import { Field, InputType, Int } from '@nestjs/graphql';
import {
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PhotoStatEntity } from '../../entity/photoStat.entity';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';
import { PhotoEntity } from '../../../photo/entity/photo.entity';
import { PhotoViewEntity } from '../../entity/photoView.entity';
import { PhotoViewGqlInput } from './photoView.input';

@InputType()
export class PhotoStatGqlInput implements PhotoStatEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date, { nullable: true })
  @Column()
  createdAt: Date;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  viewsCount?: number;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  deletedAt?: Date;

  @Field(() => Int, { nullable: true })
  @Column()
  photoId?: number;

  @Field(() => PhotoGqlInput, { nullable: true })
  @OneToOne(() => PhotoEntity, (photo) => photo.stats)
  @JoinColumn({ name: 'photoId' })
  photo: PhotoGqlInput;

  @Field(() => [PhotoViewGqlInput], { nullable: true })
  @OneToMany(() => PhotoViewEntity, (view) => view.photoStat)
  views: PhotoViewGqlInput[];
}
