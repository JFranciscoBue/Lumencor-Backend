import { UniversalFormDto } from './universal-form.dto.js';
import { IsNotEmpty, IsString } from 'class-validator';

export class VolunteerFormDto extends UniversalFormDto {
  @IsNotEmpty()
  @IsString()
  availability: string;
}
