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

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.recipesService.findAll(page, limit);
  }

  @Get(':id')
  async getRecipeById(@Param('id') id: string) {
    return this.recipesService.findById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 1 * 1024 * 1024, files: 1 },
    }),
  )
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.recipesService.create(createRecipeDto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 1 * 1024 * 1024, files: 1 },
    }),
  )
  async updateRecipe(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.recipesService.update(id, updateRecipeDto, file);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string): Promise<{ message: string }> {
    return this.recipesService.delete(id);
  }
}
