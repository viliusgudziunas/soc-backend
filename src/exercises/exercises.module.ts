import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { ExercisesExceptionsService } from './exercises-exceptions.service';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesResolver, ExercisesService, ExercisesExceptionsService],
})
export class ExercisesModule {}
