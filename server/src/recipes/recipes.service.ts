import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Model } from 'mongoose';
import { Recipe } from './recipe.schema';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}

  async findAll(page = 1, limit = 10): Promise<Recipe[]> {
    const skip = (page - 1) * limit;
    return this.recipeModel.find().skip(skip).limit(limit).exec();
  }

  async findById(id: string): Promise<Recipe> {
    const recipe = await this.recipeModel.findById(id).exec();
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }
    return recipe;
  }

  async create(
    createRecipeDto: CreateRecipeDto,
    file: Express.Multer.File,
  ): Promise<Recipe> {
    let imageUrl: string = '';

    if (file) {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file.path,
      );
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    const newRecipe = new this.recipeModel({
      ...createRecipeDto,
      imageUrl, // Save the Cloudinary image URL
    });
    return newRecipe.save();
  }
  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const updatedRecipe = await this.recipeModel
      .findByIdAndUpdate(id, updateRecipeDto, { new: true })
      .exec();
    if (!updatedRecipe) {
      throw new NotFoundException('Recipe not found');
    }
    return updatedRecipe;
  }

  async delete(id: string): Promise<void> {
    const result = await this.recipeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Recipe not found');
    }
  }
}
