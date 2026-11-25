import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity.js';
import { vi } from 'vitest';

describe('BooksService', () => {
  let service: BooksService;

  const mockBookRepository = {
    create: vi.fn(),
    save: vi.fn(),
    find: vi.fn(),
    findOne: vi.fn(),
    remove: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
