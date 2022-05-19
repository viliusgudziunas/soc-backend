import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from './exercise.entity';
import { ExercisesService } from './exercises.service';

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Query(Exercise.returns.exercises)
  async exercises(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @Query(Exercise.returns.exercise)
  async exercise(@Args(Exercise.args.id) id: number): Promise<Exercise> {
    return this.exercisesService.findById(id);
  }

  @Mutation(Exercise.returns.exercise)
  async addExercise(
    @Args('exercise') exercise: AddExerciseInput,
  ): Promise<Exercise> {
    const id = await this.exercisesService.insert(exercise);
    return this.exercisesService.findById(id);
  }

  @Mutation(Exercise.returns.exercise)
  async updateExercise(
    @Args(Exercise.args.id) id: number,
    @Args('exercise') exercise: UpdateExerciseInput,
  ): Promise<Exercise> {
    await this.exercisesService.update(id, exercise);
    return this.exercisesService.findById(id);
  }
}
