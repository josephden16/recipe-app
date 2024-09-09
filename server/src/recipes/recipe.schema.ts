import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Recipe extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  instructions: string;

  @Prop({ type: [String], required: true })
  ingredients: string[];

  @Prop({ required: false })
  imageUrl: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
