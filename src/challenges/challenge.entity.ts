import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Exercise } from 'src/exercises/exercise.entity';
import { EntityBase } from 'src/shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ChallengeParams } from './challenges.types';

@ObjectType()
@Entity('challenges')
export class Challenge extends EntityBase {
  @Field()
  @Column()
  readonly name: string;

  @Field()
  @Column()
  readonly description: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  readonly active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readonly endDate?: Date;

  @Field(() => [Exercise], { nullable: true })
  @OneToMany(() => Exercise, (exercise) => exercise.challenge)
  exercises?: Exercise[];

  constructor(params: ChallengeParams) {
    super();
    Object.assign(this, params);
  }
}

export const returns = {
  challenge: (): ReturnTypeFuncValue => Challenge,
  challenges: (): ReturnTypeFuncValue => [Challenge],
};

@InputType()
export class AddChallengeInput extends OmitType(
  Challenge,
  ['id', 'createdAt', 'updatedAt', 'exercises'],
  InputType,
) {}

@InputType()
export class UpdateChallengeInput extends PartialType(AddChallengeInput) {}
