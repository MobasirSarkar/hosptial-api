"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospital_specialists_1 = require("../controllers/hospital-specialists");
const hoSpecRoute = (0, express_1.Router)();
hoSpecRoute.post("/hospital", hospital_specialists_1.hospitalData);
hoSpecRoute.post("/specialist", hospital_specialists_1.specialistData);
exports.default = hoSpecRoute;
//# sourceMappingURL=hospital-specialist.js.map