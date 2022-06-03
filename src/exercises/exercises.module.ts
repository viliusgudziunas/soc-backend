import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsService } from 'src/services/relations.service';
import { Exercise } from './exercise.entity';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  providers: [ExercisesResolver, ExercisesService, RelationsService],
})
export class ExercisesModule {}
