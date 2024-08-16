import { Router } from "express";
import * as HC from './home.controller.mjs'

const route = Router();

// This handles the /home route
route.get('/', HC.getHome);


export default route;
