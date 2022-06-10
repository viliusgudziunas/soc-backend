import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationsService } from 'src/services/relations.service';
import { Challenge } from './challenge.entity';
import { ChallengesResolver } from './challenges.resolver';
import { ChallengesService } from './challenges.service';

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengesResolver, ChallengesService, RelationsService],
})
export class ChallengesModule {}
