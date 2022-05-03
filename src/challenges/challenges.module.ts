import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengesResolver } from './challenges.resolver';
import { ChallengesService } from './challenges.service';
import { ChallengeEntity } from './dto/challenge.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChallengeEntity])],
  providers: [ChallengesResolver, ChallengesService],
})
export class ChallengesModule {}
