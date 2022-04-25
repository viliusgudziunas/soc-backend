import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from './exercise.entity';
import { ExercisesService } from './exercises.service';

const exerciseArgs = {
  id: { name: 'id', type: () => Int },
};

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Query(() => [Exercise])
  async exercises(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @Query(() => Exercise)
  async exercise(@Args(exerciseArgs.id) id: number): Promise<Exercise> {
    return this.exercisesService.findById(id);
  }

  @Mutation(() => Exercise)
  async addExercise(
    @Args('exercise') exercise: AddExerciseInput,
  ): Promise<Exercise> {
    return this.exercisesService.insert(exercise);
  }

  @Mutation(() => Exercise)
  async updateExercise(
    @Args(exerciseArgs.id) id: number,
    @Args('exercise') exercise: UpdateExerciseInput,
  ): Promise<Exercise> {
    return this.exercisesService.update(id, exercise);
  }
}
