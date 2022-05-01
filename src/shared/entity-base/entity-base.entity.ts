import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityParams } from './entity-base.types';

@ObjectType()
export class EntityBase<T> {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;
  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;
  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  constructor(params: EntityParams<T>) {
    Object.assign(this, params);
  }
}
