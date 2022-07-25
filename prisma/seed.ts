import { PrismaClient } from '@prisma/client'
import acronymJson from '../acronym.json'
const prisma = new PrismaClient()

async function main() {
    await prisma.acronym.createMany({
        data: (acronymJson as Record<string, string>[]).map(acronym => ({
            acronym_form: Object.keys(acronym)[0],
            full_form: Object.values(acronym)[0],
        }))
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })