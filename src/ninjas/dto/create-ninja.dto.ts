import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3)
  name: string;
  color: string;
  @IsEnum(['stars', 'nunchuks'], { message: 'use correct weapon' })
  weapon: 'stars' | 'nunchuks';
}
