import { objectType, extendType, nonNull, stringArg } from 'nexus'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
const {
    AuthenticationError
} = require('apollo-server');

import { APP_SECRET } from '../utils/auth'

export const Authpayload = objectType({
    name: 'AuthPayload',
    definition(t) {
        t.nonNull.string('token');
        t.nonNull.field('user', {
            type: 'User',
        })
    }
})

export const AuthMutation = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('signup', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const { email, name } = args
                const password = await bcrypt.hash(args.password, 10)
                const checkUser = await context.prisma.user.findUnique({
                    where: { email: email },
                })

                if (checkUser) {
                    throw new AuthenticationError("Emaill is already exist")
                }
                const user = await context.prisma.user.create({
                    data: { email, name, password },
                })

                const token = jwt.sign({ userId: user.id }, APP_SECRET)
                return {
                    token,
                    user
                }
            }
        })

        t.nonNull.field('login', {
            type: 'AuthPayload',
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
            },
            async resolve(parent, args, context) {
                const user = await context.prisma.user.findUnique({
                    where: { email: args.email },
                })
                if (!user) {
                    throw new AuthenticationError("Email or password is not match")
                }
                const valid = await bcrypt.compare(
                    args.password,
                    user.password,
                )
                if (!valid) {
                    throw new AuthenticationError("Email or password is not match")
                }
                const token = jwt.sign({ userId: user.id }, APP_SECRET)
                return {
                    token,
                    user,
                }
            }
        })
    }
})