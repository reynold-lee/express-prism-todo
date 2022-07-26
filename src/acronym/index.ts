import express from 'express'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const AcronymRoutes = express.Router();

AcronymRoutes.get('/acronyms', async (req, res) => {
    try {
        const acronyms = await prisma.acronym.findMany()
        res.json(acronyms)
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
})

export default AcronymRoutes