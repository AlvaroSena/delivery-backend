import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/index"

type AuthenticateClient = {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  execute = async ({ username, password }: AuthenticateClient) => {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!client) {
      throw new Error("Client not found.");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or Password is invalid.");
    }

    const token = sign({ username }, "e8edefb16326ea5b41c0cc4bd2c9ff44", {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}