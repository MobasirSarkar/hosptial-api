import express from "express"
import authRoutes from "./routes/auth"
import hoSpecRoute from "./routes/hospital-specialist";
import dotenv from "dotenv"
import userRoutes from "./routes/user";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use("/api", hoSpecRoute)
app.use("/api", userRoutes)

app.listen(PORT, () => {
   console.log(`server is running at ${PORT}`)
})
