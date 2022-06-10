import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Challenge } from 'src/challenges/challenge.entity';
import { EntityBase } from 'src/shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { GroupParams } from './groups.types';

@ObjectType()
@Entity('groups')
export class Group extends EntityBase {
  @Field()
  @Column()
  readonly name: string;

  constructor(params: GroupParams) {
    super();
    Object.assign(this, params);
  }

  @Field(() => [Challenge], { nullable: true })
  @OneToMany(() => Challenge, (challenge) => challenge.group)
  challenges: Challenge[];

  static returns = {
    group: (): ReturnTypeFuncValue => Group,
    groups: (): ReturnTypeFuncValue => [Group],
  };
}

@InputType()
export class AddGroupInput extends OmitType(
  Group,
  ['id', 'createdAt', 'updatedAt', 'challenges'],
  InputType,
) {}

@InputType()
export class UpdateGroupInput extends PartialType(AddGroupInput) {}
