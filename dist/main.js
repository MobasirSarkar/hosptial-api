"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const hospital_specialist_1 = __importDefault(require("./routes/hospital-specialist"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use("/api", hospital_specialist_1.default);
app.use("/api", user_1.default);
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
//# sourceMappingURL=main.js.map