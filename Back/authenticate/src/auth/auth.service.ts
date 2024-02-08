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
    console.log('User found:', user); // Debugging: Log the user details
    if (user && user.password) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      console.log('Password match status:', isPasswordMatching); // Debugging: Log the password match status
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

    console.log('Registering with password:', password); // Debugging: Log the plain password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword); // Debugging: Log the hashed password

    try {
      const newUser = await this.userService.create({
        email,
        password: hashedPassword,
        name,
      });

      const { password: _, ...result } = newUser;
      return result; // Exclude password from the result sent to client
    } catch (error) {
      console.error('Error during hashing or user creation:', error);
      throw new HttpException('Failed to register user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
