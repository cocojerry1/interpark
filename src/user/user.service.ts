import { compare, hash } from 'bcrypt';
import _ from 'lodash';
import { DataSource,Repository } from 'typeorm';

import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';


import { User } from './entities/user.entity';
import { Point } from 'src/point/entities/point.entity'; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    @InjectRepository(Point)
    private pointsRepository: Repository<Point>,
    private dataSource: DataSource,
  ) {}

  async register(email: string, password: string, nickname: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 해당 이메일로 가입된 사용자가 있습니다!');
    }

  
    const hashedPassword = await hash(password, 10);
    
 
    const newUser = this.userRepository.create({ email, password: hashedPassword, nickname });
    await this.userRepository.save(newUser);


    const initialPoints = new Point();
    initialPoints.possession = 1000000; 
    initialPoints.user = newUser; 
    await this.pointsRepository.save(initialPoints);

    return newUser;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }



  async getPoint(userId: number) {
    const { sum } = await this.dataSource
      .getRepository(Point)
      .createQueryBuilder('point')
      .select('SUM(point.possession)', 'sum')
      .where('point.userId = :id', { id: userId })
      .getRawOne();
    return sum;
  }
}
