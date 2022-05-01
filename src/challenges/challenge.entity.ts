import { Field, InputType, ObjectType, OmitType } from '@nestjs/graphql';
import { EntityBase } from 'src/shared/entity-base/entity-base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('challenges')
export class Challenge extends EntityBase<Challenge> {
  @Field()
  @Column()
  readonly name: string;

  @Field()
  @Column()
  readonly description: string;

  @Field()
  @Column({ default: true })
  readonly active: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readonly endDate?: Date;
}

export const returns = {
  challenge: () => Challenge,
  challenges: () => [Challenge],
};

@InputType()
export class AddChallengeInput extends OmitType(
  Challenge,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
