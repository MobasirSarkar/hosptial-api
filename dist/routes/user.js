"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getHosptial_1 = require("../controllers/getHosptial");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/user", getHosptial_1.getHospital);
exports.default = userRoutes;
//# sourceMappingURL=user.js.map