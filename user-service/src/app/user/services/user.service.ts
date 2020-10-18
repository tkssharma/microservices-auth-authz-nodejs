import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDTO } from '../dto/user.dto';
import { User } from '../interface/user';
@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }
  async getAllUser(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async createUser(user: CreateUserDTO): Promise<User> {
    const newUser = await new this.userModel(user);
    return newUser.save();
  }
  async getUser(userId: string): Promise<User> {
    return await this.userModel.findById(userId)
  }
  async updateUser(userId: string, user: CreateUserDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, user, { new: true })
  }
  async deleteUser(userId: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(userId)
  }
}
