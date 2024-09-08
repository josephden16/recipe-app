import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto, UpdateRecipeDto } from './recipes.dto';
import { Recipe } from './recipe.schema';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Recipe[]> {
    return this.recipesService.findAll(page, limit);
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Recipe> {
    return this.recipesService.create(createRecipeDto, file);
  }
  @Put(':id')
  async updateRecipe(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string): Promise<void> {
    return this.recipesService.delete(id);
  }
}
