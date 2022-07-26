import { objectType, extendType } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

export const Todo = objectType({
    name: 'Todo',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('title')
        t.nonNull.string('content')
        t.field('owner', {
            type: 'User',
            resolve(parent, args, context) {
                return context.prisma.todo
                    .findUnique({ where: { id: parent.id } })
                    .owner()
            }
        })
    }
})