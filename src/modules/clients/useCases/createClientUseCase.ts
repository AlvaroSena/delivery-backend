import { hash } from 'bcrypt';
import { prisma } from '../../../database/index';

type CreateClient = {
  username: string,
  password: string;
}

export class CreateClientUseCase {

  execute = async ({ username, password }: CreateClient) => {
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        }
      }
    });

    if (clientExists) {
      throw new Error("User already exists.");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      }
    });

    return client;
  }
}