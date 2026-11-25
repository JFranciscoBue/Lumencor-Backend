import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UniversalFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?(?=(?:\D*\d){8,15}\D*$)[0-9\s().-]+$/, {
    message: 'El teléfono debe contener entre 8 y 15 dígitos.',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  profession: string;

  @IsString()
  @IsNotEmpty()
  consultation: string;
}
