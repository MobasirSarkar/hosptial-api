import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { haversineDistance } from "./getLocation"

const prisma = new PrismaClient()
const RADIUS = 5;

export const getHospital = async (req: Request, res: Response) => {
   const long: number = 77.07242
   const lat: number = 28.4222


   if (!lat || !long) {
      throw new Error("Fields is missing")
   }
   try {
      const hospitals = await prisma.hospital.findMany();
      console.log(`Fetched hospitals: ${hospitals.length}`);

      const nearbyHospitals = hospitals
         .filter(hospital => {
            const distance = haversineDistance(lat, long, hospital.latitude, hospital.longitude);
            console.log(`Distance to ${hospital.name}: ${distance} km`);
            return distance <= RADIUS;
         })
         .sort((a, b) => b.rating - a.rating);

      console.log(`Nearby hospitals: ${nearbyHospitals.length}`);
      res.json(nearbyHospitals);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error has occurred" });
   }
}
