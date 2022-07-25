"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const index_1 = require("./acronym/index");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
exports.routes = express_1.default.Router();
exports.routes.use(index_1.AcronymRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
