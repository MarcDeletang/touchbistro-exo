import { Module } from '@nestjs/common';
import { PrimesModule } from './primes/primes.module';

@Module({
  imports: [PrimesModule],
})
export class AppModule {}
