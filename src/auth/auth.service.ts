import { User } from "./../users/users.model";
import { UsersService } from "./../users/users.service";
import { CreateUserDto } from "./../users/dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist";
import {
  HttpException,
  UnauthorizedException,
} from "@nestjs/common/exceptions";
import { HttpStatus } from "@nestjs/common/enums";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmain(userDto.email);
    if (candidate) {
      throw new HttpException(
        `Користувача з таким email:${userDto.email} знайдено`,
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 8);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmain(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({ message: "Некоректний пароль" });
  }
}
