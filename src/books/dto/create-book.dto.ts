import { IsNotEmpty, IsDecimal, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  @IsString()
  image_Url: string;
}
