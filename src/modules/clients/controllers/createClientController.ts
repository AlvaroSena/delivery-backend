import { Request, Response } from "express";
import { CreateClientUseCase } from "../useCases/createClientUseCase";


export class CreateClientController {
  handle = async (request: Request, response: Response) => {
    const { username, password } = request.body;

    const createClientUseCase = new CreateClientUseCase();

    const result = await createClientUseCase.execute({ username, password });

    return response.status(201).json(result);
  }
}