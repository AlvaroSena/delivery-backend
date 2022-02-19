import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/authenticateClient/authenticateClientController";
import { CreateClientController } from "./modules/clients/controllers/createClientController";


export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post('/clients', createClientController.handle);
routes.post('/clients/sessions/auth', authenticateClientController.handle);

