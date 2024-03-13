import _ from 'lodash';
import { parse } from 'papaparse';
import { Like, Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Concert } from './entities/concert.entitiy';
import { CreateConcertDto } from './dto/CreateConcertDto';


@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async findAll(name?: string): Promise<Concert[]> {
    if (name) {
      return await this.concertRepository.find({
        where: { name: name },
        select: ['id', 'name', 'dates', 'location', 'category'],
      });
    } else {
      return await this.concertRepository.find({
        select: ['id', 'name', 'dates', 'location', 'category'],
      });
    }
  }

  async findOne(id: number): Promise<Concert> {
    return await this.verifyConcertById(id);
  }

  async create(createConcertDto: CreateConcertDto): Promise<Concert> {
    const concert = this.concertRepository.create(createConcertDto);
    return await this.concertRepository.save(concert);
  }



  async search(name: string): Promise<Concert[]> {
    return await this.concertRepository.find({
      where: { name: Like(`%${name}%`) }, // Using Like for partial matches
      select: ['id', 'name', 'dates', 'location', 'category'],
    });
  }


  private async verifyConcertById(id: number): Promise<Concert> {
    const concert = await this.concertRepository.findOneBy({ id });
    if (!concert) {
      throw new NotFoundException('Concert not found.');
    }
    return concert;
  }
}



