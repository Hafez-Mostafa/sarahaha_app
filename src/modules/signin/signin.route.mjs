import { Router } from "express";
import * as LC from './signin.controller.mjs'

const route = Router();


route.get('/signin', LC.signin);
route.get('/logout', LC.logOut);
route.post('/signinHandler', LC.signinHandler);





export default route;
