import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class FindStatsByDateDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;
}
