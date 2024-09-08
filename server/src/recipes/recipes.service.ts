import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Recipe } from './recipe.schema';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    private cloudinary: CloudinaryService,
  ) {}

  async findAll(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const maxLimit = Math.min(limit, 30);

      const recipes = await this.recipeModel
        .find()
        .skip(skip)
        .limit(maxLimit)
        .exec();

      const total = await this.recipeModel.countDocuments().exec();
      const data = {
        results: recipes,
        total,
        limit,
        currentPage: page,
        totalPages: Math.ceil(total / maxLimit),
        hasNextPage: page * maxLimit < total,
      };
      return { data };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please use a valid recipe id');
      }

      const recipe = await this.recipeModel.findById(id).exec();
      if (!recipe) {
        throw new NotFoundException('Recipe not found');
      }
      return { data: recipe };
    } catch (error) {
      throw error;
    }
  }

  async create(createRecipeDto: CreateRecipeDto, file: Express.Multer.File) {
    try {
      let imageUrl = null;

      if (file) {
        const result = await this.cloudinary.uploadImage(file);
        imageUrl = result.secure_url;
      }

      const newRecipe = new this.recipeModel({
        ...createRecipeDto,
        imageUrl,
      });
      return { data: await newRecipe.save() };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
    file: Express.Multer.File,
  ) {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please use a valid recipe id');
      }

      let imageUrl: string = '';

      if (file) {
        const result = await this.cloudinary.uploadImage(file);
        imageUrl = result.secure_url;
      }

      let updateRecipeData = { ...updateRecipeDto };

      if (imageUrl) {
        updateRecipeData = { ...updateRecipeData, imageUrl };
      }

      const updatedRecipe = await this.recipeModel
        .findByIdAndUpdate(id, updateRecipeData, { new: true })
        .exec();

      if (!updatedRecipe) {
        throw new NotFoundException('Recipe not found');
      }
      return { data: updatedRecipe };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const isValidId = mongoose.isValidObjectId(id);

      if (!isValidId) {
        throw new BadRequestException('Please use a valid recipe id');
      }

      const result = await this.recipeModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException('Recipe not found');
      }
      return { message: 'Recipe deleted' };
    } catch (error) {
      throw error;
    }
  }
}
