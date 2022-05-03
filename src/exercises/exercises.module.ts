import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseEntity } from './dto/exercise.entity';
import { ExercisesResolver } from './exercises.resolver';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseEntity])],
  providers: [ExercisesResolver, ExercisesService],
})
export class ExercisesModule {}
