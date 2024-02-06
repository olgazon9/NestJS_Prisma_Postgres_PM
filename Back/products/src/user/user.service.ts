// src/user/user.service.ts

import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;

        // Verify if the email already exists in the database
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new HttpException('User already exists with this email', HttpStatus.BAD_REQUEST);
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            // Create the user with hashed password
            const user = await this.prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    password: true, // Include the password property in the selection
                },
            });

            return user;
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                password: true, // Include the password property in the selection
            },
        });
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                password: true, // Include the password property in the selection
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true, // Include the password property in the selection
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const { email, password, name } = updateUserDto;

        let updateData: any = {
            ...(email && { email }),
            ...(name && { name }),
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const user = await this.prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                email: true,
                name: true,
                password: true, // Include the password property in the selection
            },
        });

        return user;
    }

    async remove(id: number) {
        try {
            await this.prisma.user.delete({
                where: { id },
            });
        } catch (error) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
