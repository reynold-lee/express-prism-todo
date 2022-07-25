import express from 'express'
import { PrismaClient } from '@prisma/client'
import { AcronymRoutes } from './acronym/index'

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

export const routes = express.Router()

routes.use(AcronymRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`)
})  
