"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const prisma = new client_1.PrismaClient();
const register = async (req, res) => {
    const { email, password, name } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
        throw Error('User Already Exists');
    }
    user = await prisma.user.create({
        data: {
            name,
            email,
            password: (0, bcryptjs_1.hashSync)(password, 10)
        }
    });
    res.json(user);
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        throw Error('User does not Exists');
    }
    if (!(0, bcryptjs_1.compareSync)(password, user.password)) {
        throw Error("Invalid credentials");
    }
    const token = jwt.sign({ useId: user.userId }, JWT_SECRET);
    res.json({ user, token });
};
exports.login = login;
//# sourceMappingURL=auth.js.map