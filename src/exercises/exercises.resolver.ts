import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Exercise } from './exercise.entity';
import { ExerciseParams } from './exercise.types';
import { ExercisesService } from './exercises.service';

const exerciseArgs = {
  name: { name: 'name', type: () => String },
  calories: { name: 'calories', type: () => Int },
  timeSpentInMinutes: { name: 'timeSpentInMinutes', type: () => Int },
};

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Query(() => [Exercise])
  async exercises(): Promise<Exercise[]> {
    return this.exercisesService.findAll();
  }

  @Mutation(() => Exercise)
  async addExercise(
    @Args(exerciseArgs.name) name: string,
    @Args(exerciseArgs.calories) calories: number,
    @Args(exerciseArgs.timeSpentInMinutes) timeSpentInMinutes: number,
  ): Promise<Exercise> {
    const data: ExerciseParams = { name, calories, timeSpentInMinutes };
    return this.exercisesService.insert(data);
  }
}