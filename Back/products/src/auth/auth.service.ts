import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new HttpException('User not found or password does not match', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Debugging: Log the password to ensure it's not undefined
    console.log('Password before hashing:', password);

    // Check if password is defined and is a string
    if (typeof password !== 'string' || password.trim() === '') {
      throw new HttpException('Password is required and cannot be empty', HttpStatus.BAD_REQUEST);
    }

    try {
      // Assuming the salt rounds are correctly specified as 10
      const hashedPassword = await bcrypt.hash(password, 10);

      return this.userService.create({
        email,
        password: hashedPassword,
        name,
      });
    } catch (error) {
      console.error('Error during hashing or user creation:', error);
      throw new HttpException('Failed to register user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
