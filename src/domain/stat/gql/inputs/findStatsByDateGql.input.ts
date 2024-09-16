import { Field, InputType } from '@nestjs/graphql';
import { FindStatsByDateDto } from '../../dto/findStatsByDate.dto';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class FindStatsByDateGqlInput implements FindStatsByDateDto {
  @Field()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @Field()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;
}
