import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from 'src/decorators/field-map.decorator';
import { FieldMapType } from 'src/decorators/field-map.types';
import { RelationsService } from 'src/services/relations.service';
import {
  AddExerciseInput,
  Exercise,
  UpdateExerciseInput,
} from './exercise.entity';
import { ExercisesService } from './exercises.service';

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(
    private readonly exercisesService: ExercisesService,
    private readonly relationsService: RelationsService,
  ) {}

  @Query(Exercise.returns.exercises)
  async exercises(@FieldMap() fieldMap: FieldMapType): Promise<Exercise[]> {
    const relations = this.relationsService.constructRelations(fieldMap);
    return this.exercisesService.findAll(relations);
  }

  @Query(Exercise.returns.exercise)
  async exercise(
    @FieldMap() fieldMap: FieldMapType,
    @Args(Exercise.args.id) id: number,
  ): Promise<Exercise> {
    const relations = this.relationsService.constructRelations(fieldMap);
    return this.exercisesService.findById(id, relations);
  }

  @Mutation(Exercise.returns.exercise)
  async addExercise(
    @FieldMap() fieldMap: FieldMapType,
    @Args('exercise') exercise: AddExerciseInput,
  ): Promise<Exercise> {
    const id = await this.exercisesService.insert(exercise);

    const relations = this.relationsService.constructRelations(fieldMap);
    return this.exercisesService.findById(id, relations);
  }

  @Mutation(Exercise.returns.exercise)
  async updateExercise(
    @FieldMap() fieldMap: FieldMapType,
    @Args(Exercise.args.id) id: number,
    @Args('exercise') exercise: UpdateExerciseInput,
  ): Promise<Exercise> {
    await this.exercisesService.update(id, exercise);

    const relations = this.relationsService.constructRelations(fieldMap);
    return this.exercisesService.findById(id, relations);
  }
}
