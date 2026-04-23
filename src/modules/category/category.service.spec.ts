import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: Repository<Category>;

  // Mock do repositório com as funções utilizadas no service
  const mockCategoryRepository = {
    create: jest.fn() as any,
    save: jest.fn() as any,
    find: jest.fn() as any,
    findOneBy: jest.fn() as any,
    softDelete: jest.fn() as any,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<Repository<Category>>(getRepositoryToken(Category));

    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const categoryData = { name: 'Lazer' };
      const savedCategory = { id: 'uuid-123', ...categoryData };

      mockCategoryRepository.create.mockReturnValue(savedCategory);
      mockCategoryRepository.save.mockResolvedValue(savedCategory);

      const result = await service.create(categoryData);

      expect(result).toEqual(savedCategory);
      expect(mockCategoryRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException when category does not exist', async () => {
      // Simula que o banco retornou null
      mockCategoryRepository.findOneBy.mockResolvedValue(null);

      await expect(service.findById('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return a category when it exists', async () => {
      const category = { id: '1', name: 'Alimentação' };
      mockCategoryRepository.findOneBy.mockResolvedValue(category);

      const result = await service.findById('1');
      expect(result).toEqual(category);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories = [
        { id: '1', name: 'Alimentação' },
        { id: '2', name: 'Transposte' },
      ];
      mockCategoryRepository.find.mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
      expect(mockCategoryRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if there are no categories', async () => {
      mockCategoryRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if category to update does note exist', async () => {
      mockCategoryRepository.findOneBy.mockResolvedValue(null);

      await expect(
        service.update('invalid-id', { name: 'Novo Nome' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should update and return the category succefully', async () => {
      const existingCategory = { id: '1', name: 'Lazer' };
      const updateData = { name: 'Entretenimento' };
      const updatedCategory = { ...existingCategory, ...updateData };

      // Simula que a categoria foi encontrada
      mockCategoryRepository.findOneBy.mockResolvedValue(existingCategory);
      mockCategoryRepository.save.mockResolvedValue(updatedCategory);

      const result = await service.update('1', updateData);

      expect(result).toEqual(updatedCategory);
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(updatedCategory);
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if category to remove does not exist', async () => {
      mockCategoryRepository.softDelete.mockResolvedValue({ affected: 0 });

      await expect(service.delete('invalid-id')).rejects.toThrow(NotFoundException);
    });

    it('should successfully soft delete the category', async () => {
      const existingCategory = { id: '1', name: 'Lazer' };

      mockCategoryRepository.findOneBy.mockResolvedValue(existingCategory);
      mockCategoryRepository.softDelete.mockResolvedValue({ affected: 1 }); 

      await service.delete('1');

      expect(mockCategoryRepository.softDelete).toHaveBeenCalledWith('1');
      expect(mockCategoryRepository.softDelete).toHaveBeenCalledTimes(1);
    })
  })
});
