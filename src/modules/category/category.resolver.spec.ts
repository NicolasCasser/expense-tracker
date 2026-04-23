import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { CategoryResolver } from "./category.resolver";
import { CategoryService  } from "./category.service";
import { Test, TestingModule } from "@nestjs/testing";

describe('CategoryResolver', () => {
  let resolver: CategoryResolver;
  let service: CategoryService;

  const mockCategoryService = {
    create: jest.fn() as any,
    update: jest.fn() as any,
    delete: jest.fn() as any,
    findAll: jest.fn() as any,
    findById: jest.fn() as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryResolver,
        {
          // Avisa o Nest para que quando o resolver chamar o CategoryService, utilizar o mock
          provide: CategoryService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    resolver = module.get<CategoryResolver>(CategoryResolver);
    service = module.get<CategoryService>(CategoryService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      // Arrange
      const categories = [
        { id: '1', name: 'Alimentação' },
        { id: '2', name: 'Transporte' },
        { id: '3', name: 'Lazer'},
      ];
      mockCategoryService.findAll.mockResolvedValue(categories);

      // Act
      const result = await resolver.findAll();

      // Assert
      expect(result).toEqual(categories);
      expect(mockCategoryService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a category by id', async () => {
      // Arrange
      const category = { id: '1', name: 'Alimentação' };
      mockCategoryService.findById.mockResolvedValue(category);
      
      // Act
      const result = await resolver.findById('1');

      // Assert
      expect(result).toEqual(category); // Espera que o usuário tenha recebido a categoria buscada
      expect(mockCategoryService.findById).toHaveBeenCalledTimes(1); // Espera que o metodo findById teha sido chamado
      expect(mockCategoryService.findById).toHaveBeenCalledWith('1'); // Espera que o id passado para o método tenha sido o id correto
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      // Arrange
      // Simula o envio de dados para criar uma categoria e o resultado de retorno esperado
      const inputData = { name: 'Lazer' };
      const expectedResult = { id: '1', name: 'Lazer' };
      // Avisa o mock para devolver uma promisse com o valor da variável expectedResult quando o método create for chamado
      mockCategoryService.create.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.create(inputData);

      // Assert
      expect(result).toEqual(expectedResult); // Verifica se o resultado foi igual o resultado esperado
      expect(mockCategoryService.create).toHaveBeenCalledTimes(1); // Verifica se a função foi chamada
      expect(mockCategoryService.create).toHaveBeenCalledWith(inputData); // Verifica se a função create foi chamada com o input correto
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      // Arrange
      // Define o id alvo, os dados enviados para alteração e o resultado final esperado após a atualização
      const categoryId = '1';
      const updateData = { name: 'Lazer Atualizado' };
      const expectedResult = { id: categoryId, name: 'Lazer Atualizado' };
      // Configura o mock para retornar uma Promisse com o objeto atualizado
      mockCategoryService.update.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.update(categoryId, updateData);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockCategoryService.update).toHaveBeenCalledTimes(1);
      expect(mockCategoryService.update).toHaveBeenCalledWith(categoryId, updateData);
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      // Arrange
      const category = { id: '1', name: 'Lazer' };
      const expectedResult = 'Category deleted seccessfully';
      mockCategoryService.delete.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.delete(category.id);

      // Assert
      expect(result).toEqual(expectedResult);
      expect(mockCategoryService.delete).toHaveBeenCalledTimes(1);
      expect(mockCategoryService.delete).toHaveBeenCalledWith('1');
    });
  });
});