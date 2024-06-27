import { Router } from "express"
import { hospitalData, specialistData } from "../controllers/hospital-specialists";

const hoSpecRoute: Router = Router();

hoSpecRoute.post("/hospital", hospitalData)
hoSpecRoute.post("/specialist", specialistData)

export default hoSpecRoute;
