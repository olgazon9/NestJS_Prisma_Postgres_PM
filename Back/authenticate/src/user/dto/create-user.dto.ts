// src/user/dto/create-user.dto.ts

export class CreateUserDto {
  email: string;
  password: string;
  name?: string; // Assuming this is optional
}
