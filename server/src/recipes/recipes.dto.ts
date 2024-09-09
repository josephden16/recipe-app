import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty({ message: 'Recipe title is required' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'Recipe instructions is required' })
  readonly instructions: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one ingredient is required' })
  readonly ingredients: string[];

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}

export class UpdateRecipeDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly instructions?: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one ingredient is required' })
  @IsOptional()
  readonly ingredients?: string[];

  @IsString()
  @IsOptional()
  readonly imageUrl?: string;
}
