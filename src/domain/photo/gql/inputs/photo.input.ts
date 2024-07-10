import { Field, InputType, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PhotoEntity } from '../../entity/photo.entity';
import { UserGqlInput } from '../../../user/gql/inputs/user.input';
import { PhotoStatGqlInput } from '../../../stat/gql/inputs/photoStat.input';
import { UserEntity } from '../../../user/entity/user.entity';
import { PhotoStatEntity } from '../../../stat/entity/photoStat.entity';

@InputType()
export class PhotoGqlInput implements PhotoEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  link: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => UserGqlInput, { nullable: true })
  @ManyToOne(() => UserEntity, (user) => user.photo, { cascade: true })
  user: UserEntity;

  @Field(() => PhotoStatGqlInput, { nullable: true })
  @OneToOne(() => PhotoStatEntity, (stats) => stats.photo, {
    eager: true,
  })
  stats: PhotoStatEntity;
}
