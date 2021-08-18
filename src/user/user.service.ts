import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  save(user: User): User {
    this.userRepository.save(user);
    return user;
  }

  findOne(email: string): User {
    return this.userRepository.findOne(email);
  }

  findOrCreate(createUserDto: CreateUserDto): User {
    const { email, name } = createUserDto;

    const findedUser: User = this.findOne(email);
    if (findedUser) return findedUser;

    const createdUser: User = { email, name };
    return this.save(createdUser);
  }
}
