import { objectType, extendType, stringArg, intArg } from 'nexus'

export const user = objectType({
    name: "User",
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.string('name')
        t.nonNull.string('email')
        t.nonNull.string('password')
        t.nonNull.string('role')
        t.nonNull.list.nonNull.field('todos', {
            type: 'Todo',
            resolve(parent, args, context) {
                return context.prisma.user
                    .findUnique({ where: { id: parent.id } })
                    .todos();
            }
        })
    }
})

export const UserQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('users', {
            type: 'User',
            args: {
                search: stringArg(),
                skip: intArg(),
                take: intArg(),
            },
            resolve(parent, args, context) {
                const where = args.search
                    ? {
                        OR: [
                            { name: { contains: args.search } },
                            { email: { contains: args.search } },
                        ],
                    }
                    : {}
                return context.prisma.user.findMany({
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                })
            }
        })

        t.nonNull.field('user', {
            type: 'User',
            args: {
                id: intArg(),
            },
            resolve(parent, args, context) {
                return context.prisma.user.findUnique({ where: { id: args?.id as number | undefined, } })
            }
        })
    }
})
