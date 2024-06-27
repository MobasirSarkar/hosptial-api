import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const hospitalData = async (req: Request, res: Response) => {
   const { hospitalId, name, address, imageUrl, rating, latitude, longitude } = req.body;
   try {
      let hospital = await prisma.hospital.findUnique({ where: { hospitalId } })
      if (hospital) {
         throw new Error("Hospital already exists")
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
      })
      res.json({ hospitalData })
   } catch (error) {
      res.status(500).json({ error: "Failed to create hospitalData" })
   }
}

export const specialistData = async (req: Request, res: Response) => {
   const { specId, name, icon, noOfDoc } = req.body;
   try {
      let specialist = await prisma.specialist.findUnique({ where: { specId } })
      if (specialist) {
         throw new Error("Specialist already exists")
      }
      const hospitalData = await prisma.specialist.create({
         data: {
            specId,
            name,
            icon,
            noOfDoc,
         }
      })
      res.json({ hospitalData })
   } catch (error) {
      res.status(500).json({ error: "Failed to create hospitalData" })
   }
}

