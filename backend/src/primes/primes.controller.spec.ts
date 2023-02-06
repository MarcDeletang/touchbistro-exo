import { Test, TestingModule } from '@nestjs/testing';
import { PrimesController } from './primes.controller';
import { PrimesService } from './primes.service';

describe('PrimesController', () => {
  let controller: PrimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimesController],
      providers: [PrimesService],
    }).compile();

    controller = module.get<PrimesController>(PrimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 3 for max = 6', () => {
    const res = controller.findPrimeMedian({ max: 6 });
    expect(res).toStrictEqual([3]);
  });
});
