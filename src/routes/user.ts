import { Router } from "express"
import { getHospital } from "../controllers/getHosptial";

const userRoutes: Router = Router();

userRoutes.get("/user", getHospital)

export default userRoutes
