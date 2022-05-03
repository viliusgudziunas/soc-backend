import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ModelBase {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;
}
