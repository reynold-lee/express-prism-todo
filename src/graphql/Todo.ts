import { objectType, extendType, stringArg, intArg, nonNull } from 'nexus'
const {
    ForbiddenError
} = require('apollo-server');

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

export const TodoQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('todos', {
            type: 'Todo',
            args: {
                search: stringArg(),
                skip: intArg(),
                take: intArg(),
            },
            async resolve(parent, args, context) {
                if (!context.userId) throw new ForbiddenError('Please Login.')
                const user = await context.prisma.user.findUnique({ where: { id: context.userId } })
                if (!user) throw new ForbiddenError('User not found.');
                const where = user.role !== 'ADMIN' ? args.search
                    ? {
                        owner: {
                            id: { equals: user.id }
                        },
                        OR: [
                            { title: { contains: args.search } },
                            { content: { contains: args.search } },
                        ],
                    }
                    : {
                        owner: {
                            id: { equals: user.id }
                        }
                    }
                    : args.search
                        ? {
                            OR: [
                                { title: { contains: args.search } },
                                { content: { contains: args.search } },
                            ],
                        }
                        : {}
                return context.prisma.todo.findMany({
                    where,
                    skip: args?.skip as number | undefined,
                    take: args?.take as number | undefined,
                })
            }
        })

        t.field('todo', {
            type: 'Todo',
            args: {
                id: intArg(),
            },
            resolve(parent, args, context) {
                if (!context.userId) throw new ForbiddenError('Please Login.')
                return context.prisma.todo.findUnique({ where: { id: args?.id as number | undefined, } })
            }
        })
    }
})

export const todoMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('todopost', {
            type: 'Todo',
            args: {
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            resolve(parent, args, context) {
                const { userId } = context
                if (!userId) {
                    throw new ForbiddenError('Please log in.')
                }
                const newTodo = context.prisma.todo.create({
                    data: {
                        content: args.content,
                        title: args.title,
                        owner: { connect: { id: userId } }
                    }
                })

                return newTodo
            }
        })

        t.nonNull.field('todopatch', {
            type: 'Todo',
            args: {
                id: nonNull(intArg()),
                title: nonNull(stringArg()),
                content: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                if (!context.userId) {
                    throw new ForbiddenError('Please log in.')
                }
                const user = await context.prisma.user.findUnique({ where: { id: context.userId } })
                const originTodo = await context.prisma.todo.findUnique({ where: { id: args?.id as number | undefined, } })
                if (user?.role === 'ADMIN' && user.id === originTodo?.ownerId) {
                    return context.prisma.todo.update({
                        where: {
                            id: args?.id,
                        },
                        data: {
                            title: args.title ? args.title : originTodo?.title,
                            content: args.content ? args.content : originTodo?.content,
                        },
                    })
                }
                throw new ForbiddenError('You are not allowed.')
            }
        })

        t.nonNull.field('todoDelete', {
            type: 'Todo',
            args: {
                id: nonNull(intArg()),
            },
            async resolve(parent, args, context) {
                if (!context.userId) {
                    throw new ForbiddenError('Please log in.')
                }
                const user = await context.prisma.user.findUnique({ where: { id: context.userId } })
                const originTodo = await context.prisma.todo.findUnique({ where: { id: args?.id as number | undefined, } })
                if (user?.role === 'ADMIN' || user?.id === originTodo?.ownerId) {
                    return context.prisma.todo.delete({ where: { id: args?.id as number | undefined, } })
                }
                throw new ForbiddenError('You are not allowed.')
            }
        })
    },
})
