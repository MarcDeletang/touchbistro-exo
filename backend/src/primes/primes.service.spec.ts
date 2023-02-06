import { Test, TestingModule } from '@nestjs/testing';
import { PrimesService } from './primes.service';

describe('PrimesService', () => {
  let service: PrimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimesService],
    }).compile();

    service = module.get<PrimesService>(PrimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return [3, 5] for n = 10', () => {
    expect(service.getPrimesMedian(10)).toStrictEqual([3, 5]);
  });

  it('should return [7] for n = 18', () => {
    expect(service.getPrimesMedian(18)).toStrictEqual([7]);
  });

  it('should return [3] for n = 6', () => {
    expect(service.getPrimesMedian(6)).toStrictEqual([3]);
  });
});
