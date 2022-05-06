import { Field, ObjectType } from '@nestjs/graphql';
import { EntityBase } from 'src/shared/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('groups')
export class Group extends EntityBase {
  @Field()
  @Column()
  readonly name: string;
}