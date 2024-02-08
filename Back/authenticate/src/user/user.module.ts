import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service'; // Assuming you have a PrismaService for database operations

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService], // Export UserService if it needs to be used by other modules, e.g., AuthService
})
export class UserModule {}
