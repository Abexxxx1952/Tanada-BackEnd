import { Field, InputType, Int } from '@nestjs/graphql';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoStatEntity } from '../../entity/photoStat.entity';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';
import { PhotoEntity } from '../../../photo/entity/photo.entity';

@InputType()
export class PhotoStatGqlInput implements PhotoStatEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  created?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  viewsCount?: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  deleted?: number;

  @Field(() => Int, { nullable: true })
  @Column()
  photoId: number;

  @Field(() => PhotoGqlInput, { nullable: true })
  @OneToOne(() => PhotoEntity, (photo) => photo.stats)
  @JoinColumn({ name: 'photoId' })
  photo: PhotoGqlInput;
}
