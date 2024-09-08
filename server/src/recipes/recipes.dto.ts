export class CreateRecipeDto {
  readonly title: string;
  readonly description: string;
  readonly ingredients: string[];
  readonly imageUrl?: string;
}

export class UpdateRecipeDto {
  readonly title?: string;
  readonly description?: string;
  readonly ingredients?: string[];
  readonly imageUrl?: string;
}
