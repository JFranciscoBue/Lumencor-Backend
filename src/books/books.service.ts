import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity.js';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly BookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { price } = createBookDto;

    if (price <= 0)
      throw new BadRequestException('El precio debe ser mayor a cero');

    const book: Book = this.BookRepository.create(createBookDto);

    return await this.BookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    const books: Book[] = await this.BookRepository.find();

    return books;
  }

  async findOne(id: string): Promise<Book | null> {
    const book: Book | null = await this.BookRepository.findOne({
      where: { id: id },
    });

    if (!book)
      throw new NotFoundException(
        'El libro no fue encontrado. Intenta de nuevo',
      );

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: string): Promise<Book> {
    const book = await this.findOne(id);

    if (!book)
      throw new NotFoundException(
        'El libro no fue encontrado. Intenta de nuevo',
      );

    const result = await this.BookRepository.remove(book);

    console.log(result);

    return result;
  }
}
