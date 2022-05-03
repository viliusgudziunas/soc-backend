import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  ReturnTypeFuncValue,
} from '@nestjs/graphql';
import { ModelBase } from 'src/shared/base/base.model';

@ObjectType()
export class Challenge extends ModelBase {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field({ defaultValue: true })
  readonly active: boolean;

  @Field({ nullable: true })
  readonly endDate?: Date;

  // @Field(() => [Exercise], { nullable: true })
  // exercises?: Exercise[];
}

export const returns = {
  challenge: (): ReturnTypeFuncValue => Challenge,
  challenges: (): ReturnTypeFuncValue => [Challenge],
};

@InputType()
export class AddChallengeInput extends OmitType(
  Challenge,
  // ['id', 'createdAt', 'updatedAt', 'exercises'],
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}

@InputType()
export class UpdateChallengeInput extends PartialType(AddChallengeInput) {}
