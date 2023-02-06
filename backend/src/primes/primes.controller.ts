import { Controller, Get, Query } from '@nestjs/common';
import { FindMedianQueryDto } from './primes.dto';
import { PrimesService } from './primes.service';

@Controller('primes')
export class PrimesController {
  constructor(protected readonly primesService: PrimesService) {}

  @Get('median')
  findPrimeMedian(@Query() { max }: FindMedianQueryDto): number[] {
    return this.primesService.getPrimesMedian(max);
  }
}
