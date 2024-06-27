import { Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { hashSync, compareSync } from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
   const { email, password, name } = req.body;
   let user = await prisma.user.findUnique({ where: { email } })
   if (user) {
      throw Error('User Already Exists')
   }
   user = await prisma.user.create({
      data: {
         name,
         email,
         password: hashSync(password, 10)
      }
   })
   res.json(user)

}

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   let user = await prisma.user.findFirst({ where: { email } })
   if (!user) {
      throw Error('User does not Exists')
   }
   if (!compareSync(password, user.password)) {
      throw Error("Invalid credentials")
   }
   const token = jwt.sign({ useId: user.userId }, JWT_SECRET)
   res.json({ user, token })
}


