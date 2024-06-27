"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specialistData = exports.hospitalData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const hospitalData = async (req, res) => {
    const { hospitalId, name, address, imageUrl, rating, latitude, longitude } = req.body;
    try {
        let hospital = await prisma.hospital.findUnique({ where: { hospitalId } });
        if (hospital) {
            throw new Error("Hospital already exists");
        }
        const hospitalData = await prisma.hospital.create({
            data: {
                hospitalId,
                name,
                address,
                imageUrl,
                rating,
                latitude,
                longitude
            }
        });
        res.json({ hospitalData });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create hospitalData" });
    }
};
exports.hospitalData = hospitalData;
const specialistData = async (req, res) => {
    const { specId, name, icon, noOfDoc } = req.body;
    try {
        let specialist = await prisma.specialist.findUnique({ where: { specId } });
        if (specialist) {
            throw new Error("Specialist already exists");
        }
        const hospitalData = await prisma.specialist.create({
            data: {
                specId,
                name,
                icon,
                noOfDoc,
            }
        });
        res.json({ hospitalData });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create hospitalData" });
    }
};
exports.specialistData = specialistData;
//# sourceMappingURL=hospital-specialists.js.map