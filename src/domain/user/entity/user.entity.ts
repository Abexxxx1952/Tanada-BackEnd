import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v5 as uuidv5 } from 'uuid';
import { PhotoEntity } from '../../photo/entity/photo.entity';
import { UserPermissions, UserPermissionsKeys } from '../permission/permission';
import { RegistrationSources } from '../auth/types/providersOAuth.enum';
import { Payload } from '../types/payload';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  icon?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @Column({ type: 'jsonb', array: true, nullable: true })
  payload: Payload[];

  @OneToMany(() => PhotoEntity, (photo) => photo.user, {
    eager: true,
  })
  photo: PhotoEntity[];

  @Column({
    type: 'enum',
    enum: UserPermissions,
    array: true,
    default: ['CreatePhoto', 'UpdatePhoto', 'DeletePhoto'],
  })
  permissions: UserPermissionsKeys[];

  @Column({
    type: 'enum',
    enum: RegistrationSources,
    array: true,
    default: [],
  })
  registrationSources: RegistrationSources[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}
