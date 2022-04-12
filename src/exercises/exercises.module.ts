import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './exercise.entity';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesService, ExercisesResolver],
})
export class ExercisesModule {}
