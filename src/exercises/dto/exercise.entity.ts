import { EntityBase } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('exercises')
export class ExerciseEntity extends EntityBase<ExerciseEntity> {
  @Column()
  readonly name: string;

  @Column()
  readonly calories: number;

  @Column()
  readonly timeSpentInMinutes: number;

  // @ManyToOne(() => ChallengeEntity, (challenge) => challenge.exercises)
  // challenge?: Challenge;
}
