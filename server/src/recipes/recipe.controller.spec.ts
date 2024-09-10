import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  const mockRecipesService = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findAll: jest.fn().mockImplementation((_page: number, _limit: number) => {
      return Promise.resolve({
        recipes: [
          {
            _id: '1',
            title: 'Recipe 1',
            instructions: 'instructions 1',
            ingredients: ['ingredient 1'],
            imageUrl: '',
          },
          {
            _id: '2',
            title: 'Recipe 2',
            instructions: 'instructions 2',
            ingredients: ['ingredient 2'],
            imageUrl: '',
          },
        ],
        total: 2,
      });
    }),
    findById: jest.fn().mockImplementation((id: string) => {
      return Promise.resolve({
        _id: id,
        title: 'Recipe 1',
        instructions: 'instructions 1',
        ingredients: ['ingredient 1'],
        imageUrl: '',
      });
    }),
    create: jest.fn().mockImplementation((dto) => {
      return Promise.resolve({ _id: '3', ...dto });
    }),
    update: jest.fn().mockImplementation((id: string, dto) => {
      return Promise.resolve({ _id: id, ...dto });
    }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: jest.fn().mockImplementation((_id: string) => {
      return Promise.resolve({ acknowledged: true, deletedCount: 1 });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        {
          provide: RecipesService,
          useValue: mockRecipesService,
        },
      ],
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get paginated recipes', async () => {
    const result = await controller.getRecipes(1, 2);
    expect(result).toEqual({
      recipes: [
        {
          _id: '1',
          title: 'Recipe 1',
          instructions: 'instructions 1',
          ingredients: ['ingredient 1'],
          imageUrl: '',
        },
        {
          _id: '2',
          title: 'Recipe 2',
          instructions: 'instructions 2',
          ingredients: ['ingredient 2'],
          imageUrl: '',
        },
      ],
      total: 2,
    });
    expect(service.findAll).toHaveBeenCalledWith(1, 2);
  });

  it('should get a recipe by ID', async () => {
    const result = await controller.getRecipeById('1');
    expect(result).toEqual({
      _id: '1',
      title: 'Recipe 1',
      instructions: 'instructions 1',
      ingredients: ['ingredient 1'],
      imageUrl: '',
    });
    expect(service.findById).toHaveBeenCalledWith('1');
  });

  it('should create a new recipe', async () => {
    const dto = {
      title: 'Recipe 3',
      instructions: 'instructions 3',
      ingredients: ['ingredient 3'],
      imageUrl: '',
    };
    const result = await controller.createRecipe(dto, null); // Assuming file upload handled elsewhere
    expect(result).toEqual({ _id: '3', ...dto });
    expect(service.create).toHaveBeenCalledWith(dto, null);
  });

  it('should update a recipe', async () => {
    const dto = {
      title: 'Updated Recipe',
      instructions: 'Updated instructions',
      ingredients: ['ingredient 4'],
      imageUrl: '',
    };
    const result = await controller.updateRecipe('1', dto, null);
    expect(result).toEqual({ _id: '1', ...dto });
    expect(service.update).toHaveBeenCalledWith('1', dto, null);
  });

  it('should delete a recipe', async () => {
    const result = await controller.deleteRecipe('1');
    expect(result).toEqual({ acknowledged: true, deletedCount: 1 });
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
