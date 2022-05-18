import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType({ isAbstract: true })
export class EntityBase {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  static args = {
    id: { name: 'id', type: (): GraphQLScalarType => Int },
  };
}
