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
import { ApiProperty } from '@nestjs/swagger';
import { v5 as uuidv5 } from 'uuid';
import { PhotoEntity } from '../../photo/entity/photo.entity';
import { PermissionEnum, PermissionEnumKeys } from '../permission/permission';
import { RegistrationSources } from '../auth/types/providersOAuth.enum';

@Entity('user')
export class UserEntity {
  @PrimaryColumn('uuid')
  @ApiProperty({ type: 'string', format: 'UUID' })
  id: string;

  @Column({ nullable: true })
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @Index()
  @ApiProperty()
  email: string;

  @Exclude()
  @Column({ nullable: true })
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  icon: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @Column({ nullable: true })
  @ApiProperty()
  hashedRefreshToken?: string;

  @Column({ type: 'jsonb', array: true, nullable: true })
  @ApiProperty()
  payload: Record<string, string>[];

  @OneToMany(() => PhotoEntity, (photo) => photo.user, {
    eager: true,
  })
  @ApiProperty({ type: () => [PhotoEntity] })
  photo: PhotoEntity[];

  @Column({
    type: 'enum',
    enum: PermissionEnum,
    array: true,
    default: ['CreatePhoto', 'UpdatePhoto', 'DeletePhoto'],
  })
  @ApiProperty()
  permissions: PermissionEnumKeys[];

  @Column({
    type: 'enum',
    enum: RegistrationSources,
    array: true,
    default: [],
  })
  @ApiProperty()
  registrationSources: RegistrationSources[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}
