import express from "express";
import { createUser, getUser,getUsers, login} from "./users.controller";
import  authenticate  from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
const router =express.Router();

router.route("/").post(createUser).get(authenticate,getUsers);
router.route("/login").post(login)
router.route("/:email").get(authenticate,authorize("ADMIN","STUDENT","INSTRUCTOR"),getUser);


export default router;