import { Router } from "express";
import * as MC from './message.controller.mjs'

const route = Router();

route.post('/sendMessage', MC.sendMessage);



route.get('/profile', MC.getprofile);

export default route;
