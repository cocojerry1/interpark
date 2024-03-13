
import { Category } from '../types/concert.type';

export class CreateConcertDto {
  name: string;
  description: string;
  dates: Date[];
  seat: any; 
  location: string;
  imgUrl: string;
  category: Category;
}
