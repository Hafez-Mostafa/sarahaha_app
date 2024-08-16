import { Router } from "express";
import * as RC from './register.controller.mjs'

const route = Router();



route.get('/register', RC.register);
route.post('/registerHandler', RC.registerHandler);




export default route;
