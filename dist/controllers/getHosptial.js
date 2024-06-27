"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHospital = void 0;
const client_1 = require("@prisma/client");
const getLocation_1 = require("./getLocation");
const prisma = new client_1.PrismaClient();
const RADIUS = 5;
const getHospital = async (req, res) => {
    const long = 77.07242;
    const lat = 28.4222;
    if (!lat || !long) {
        throw new Error("Fields is missing");
    }
    try {
        const hospitals = await prisma.hospital.findMany();
        console.log(`Fetched hospitals: ${hospitals.length}`);
        const nearbyHospitals = hospitals
            .filter(hospital => {
            const distance = (0, getLocation_1.haversineDistance)(lat, long, hospital.latitude, hospital.longitude);
            console.log(`Distance to ${hospital.name}: ${distance} km`);
            return distance <= RADIUS;
        })
            .sort((a, b) => b.rating - a.rating);
        console.log(`Nearby hospitals: ${nearbyHospitals.length}`);
        res.json(nearbyHospitals);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error has occurred" });
    }
};
exports.getHospital = getHospital;
//# sourceMappingURL=getHosptial.js.map