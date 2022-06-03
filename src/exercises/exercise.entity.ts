import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { Challenge } from 'src/challenges/challenge.entity';
import { EntityBase } from 'src/shared/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExerciseParams } from './exercises.types';

@ObjectType()
@Entity('exercises')
export class Exercise extends EntityBase {
  @Field()
  @Column()
  readonly name: string;

  @Field(() => Int)
  @Column()
  readonly calories: number;

  @Field(() => Int)
  @Column()
  readonly timeSpentInMinutes: number;

  @Column()
  readonly challengeId: number;

  @Field(() => Challenge)
  @ManyToOne(() => Challenge, (challenge) => challenge.exercises)
  @JoinColumn({ name: 'challengeId' })
  readonly challenge: Challenge;

  constructor(params: ExerciseParams) {
    super();
    Object.assign(this, params);
  }

  static returns = {
    exercise: (): ReturnTypeFuncValue => Exercise,
    exercises: (): ReturnTypeFuncValue => [Exercise],
  };
}

@InputType()
export class AddExerciseInput extends OmitType(
  Exercise,
  ['id', 'createdAt', 'updatedAt', 'challenge'],
  InputType,
) {
  @Field(() => Int)
  readonly challengeId: number;
}

@InputType()
export class UpdateExerciseInput extends OmitType(
  PartialType(AddExerciseInput),
  ['challengeId'],
) {}
