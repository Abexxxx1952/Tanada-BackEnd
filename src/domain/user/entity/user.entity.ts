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
import { PermissionEnum, PermissionEnumKeys } from '../permission/permission';

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
  @Column()
  password: string;

  @Column({ nullable: true })
  icon?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  hashedRefreshToken?: string;

  @Column({ type: 'jsonb', array: true, nullable: true })
  payload: Record<string, string>[];

  @OneToMany(() => PhotoEntity, (photo) => photo.user, {
    eager: true,
  })
  photo: PhotoEntity[];

  @Column({
    type: 'enum',
    enum: PermissionEnum,
    array: true,
    default: ['CreatePhoto', 'UpdatePhoto', 'DeletePhoto'],
  })
  permissions: PermissionEnumKeys[];

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = uuidv5(this.email, uuidv5.URL);
    }
  }
}
