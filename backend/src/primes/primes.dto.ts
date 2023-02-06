import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class FindMedianQueryDto {
  @IsInt()
  @Min(3)
  @Max(1000 * 1000)
  @Type(() => Number)
  max!: number;
}
