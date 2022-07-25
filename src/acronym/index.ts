import express from 'express'
import { PrismaClient } from '@prisma/client';

export const AcronymRoutes = express.Router();

const prisma = new PrismaClient()

AcronymRoutes.get('/acronym', async (req, res) => {
    try {
        const acronyms = await prisma.acronym.findMany()
        res.json(acronyms)
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }
})
