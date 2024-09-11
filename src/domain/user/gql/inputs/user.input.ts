import { Field, ID, InputType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v5 as uuidv5 } from 'uuid';
import {
  UserPermissions,
  UserPermissionsKeys,
} from '../../permission/permission';
import { RegistrationSources } from '../../auth/types/providersOAuth.enum';
import { PayloadGqlInput } from './payload.input';
import { UserEntity } from '../../entity/user.entity';
import { PhotoGqlInput } from '../../../photo/gql/inputs/photo.input';
import { PhotoEntity } from '../../../photo/entity/photo.entity';

@InputType()
export class UserGqlInput implements UserEntity {
  @Field(() => ID, { nullable: true })
  @PrimaryColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon?: string;

  @Field({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => [PayloadGqlInput], { nullable: true })
  @Column({ type: 'jsonb', array: true })
  payload: PayloadGqlInput[];

  @Field(() => [PhotoGqlInput], { nullable: true })
  @OneToMany(() => PhotoEntity, (photo) => photo.user, {
    eager: true,
  })
  photo: PhotoGqlInput[];

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'enum',
    enum: UserPermissions,
    array: true,
    default: ['CreatePhoto', 'UpdatePhoto', 'DeletePhoto'],
  })
  permissions: UserPermissionsKeys[];

  @Field(() => [String], { nullable: true })
  @Column({
    type: 'enum',
    enum: RegistrationSources,
    array: true,
    default: [],
  })
  registrationSources: RegistrationSources[];

  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}
