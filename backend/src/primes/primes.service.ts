import { Injectable } from '@nestjs/common';

@Injectable()
export class PrimesService {
  protected calculatePrimes(max: number): number[] {
    const primes = new Array(max).fill(true);
    const upperLimit = Math.sqrt(max);
    primes[0] = false;
    primes[1] = false;
    for (let i = 2; i < upperLimit; i++) {
      for (let j = 2; i * j < max; j++) {
        primes[i * j] = false;
      }
    }
    return primes.reduce((acc, val, idx) => {
      if (val) {
        acc.push(idx);
      }
      return acc;
    }, []);
  }

  public getPrimesMedian(max: number): number[] {
    const primes = this.calculatePrimes(max);
    const floor = Math.floor(primes.length / 2);

    if (primes.length % 2 === 0) {
      return primes.slice(floor - 1, floor + 1);
    }
    return [primes[floor]];
  }
}
