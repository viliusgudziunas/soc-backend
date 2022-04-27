import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [],
})
export class ChallengesModule {}
