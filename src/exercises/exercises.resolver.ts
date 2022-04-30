import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { operationArgs } from 'src/shared/operation-args';
import {
  AddExerciseInput,
  Exercise,
  returns,
  UpdateExerciseInput,
} from './exercise.entity';
import { ExercisesService } from './exercises.service';

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Query(returns.exercises)
  async exercises(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @Query(returns.exercise)
  async exercise(@Args(operationArgs.id) id: number): Promise<Exercise> {
    return this.exercisesService.findById(id);
  }

  @Mutation(returns.exercise)
  async addExercise(
    @Args('exercise') exercise: AddExerciseInput,
  ): Promise<Exercise> {
    return this.exercisesService.insert(exercise);
  }

  @Mutation(returns.exercise)
  async updateExercise(
    @Args(operationArgs.id) id: number,
    @Args('exercise') exercise: UpdateExerciseInput,
  ): Promise<Exercise> {
    return this.exercisesService.update(id, exercise);
  }
}
