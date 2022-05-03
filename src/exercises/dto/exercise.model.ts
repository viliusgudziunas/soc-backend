import {
  Field,
  InputType,
  Int,
  ObjectType,
  OmitType,
  PartialType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { ModelBase } from 'src/shared/base/base.model';

@ObjectType()
export class Exercise extends ModelBase {
  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly calories: number;

  @Field(() => Int)
  readonly timeSpentInMinutes: number;

  // @Field(() => Challenge)
  // challenge?: Challenge;
}

export const returns = {
  exercise: (): ReturnTypeFuncValue => Exercise,
  exercises: (): ReturnTypeFuncValue => [Exercise],
};

@InputType()
export class AddExerciseInput extends OmitType(
  Exercise,
  // ['id', 'createdAt', 'updatedAt', 'challenge'],
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}

@InputType()
export class UpdateExerciseInput extends PartialType(AddExerciseInput) {}
