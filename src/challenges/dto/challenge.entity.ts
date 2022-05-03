import { EntityBase } from 'src/shared/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('challenges')
export class ChallengeEntity extends EntityBase<ChallengeEntity> {
  @Column()
  readonly name: string;

  @Column()
  readonly description: string;

  @Column({ default: true })
  readonly active: boolean;

  @Column({ nullable: true })
  readonly endDate?: Date;

  // @OneToMany(() => ExerciseEntity, (exercise) => exercise.challenge)
  // exercises?: ExerciseEntity[];
}
