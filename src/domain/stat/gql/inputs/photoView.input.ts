import { Field, InputType, Int } from '@nestjs/graphql';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoStatEntity } from '../../entity/photoStat.entity';
import { PhotoViewEntity } from '../../entity/photoView.entity';
import { PhotoStatGqlInput } from './photoStat.input';

@InputType()
export class PhotoViewGqlInput implements PhotoViewEntity {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamp' })
  viewedAt: Date;

  @Field(() => Int, { nullable: true })
  @Column()
  photoStatId: number;

  @Field(() => PhotoStatGqlInput, { nullable: true })
  @ManyToOne(() => PhotoStatEntity, (photoStat) => photoStat.views)
  @JoinColumn({ name: 'photoStatId' })
  photoStat: PhotoStatGqlInput;
}
