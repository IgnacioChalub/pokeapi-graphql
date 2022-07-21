import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserDto } from "../models/user/createUser.dto";
import { User } from "../models/user/user.entity";

export class UserRepository {

    static db = new PrismaClient();

    static async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return await UserRepository.db.user.create({
                data: {
                    username: createUserDto.username,
                    email: createUserDto.email,
                    password: createUserDto.password
                },
              })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
              if (e.code === 'P2002') {
                throw new Error("Invalid " + e.meta.target[0])
              }
            }
        }
    }

    static async find(id: string): Promise<User> {
        const user = await UserRepository.db.user.findFirst({
            where: {
                id: id
            }
          })
        if(!user) throw Error("User not found");
        return user;
    }

    static async findByUsername(username: string): Promise<User> {
        const user = await UserRepository.db.user.findFirst({
            where: {
                username: username
            }
          })
        if(!user) throw Error("User not found");
        return user;
    }

}