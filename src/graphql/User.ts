import { objectType, extendType, stringArg, intArg, nonNull } from "nexus";
const { ForbiddenError } = require("apollo-server");

export const user = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.string("password");
    t.nonNull.string("role");
    t.nonNull.list.nonNull.field("todos", {
      type: "Todo",
      resolve(parent, args, context) {
        return context.prisma.user
          .findUnique({ where: { id: parent.id } })
          .todos();
      },
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("users", {
      type: "User",
      args: {
        search: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      async resolve(parent, args, context) {
        if (!context.userId) throw new ForbiddenError("Please Login.");
        const user = await context.prisma.user.findUnique({
          where: { id: context.userId },
        });
        if (!user) throw new ForbiddenError("User not found.");

        if (user.role !== "ADMIN") {
          throw new ForbiddenError("You are not allowed.");
        }
        const where = args.search
          ? {
              OR: [
                { name: { contains: args.search } },
                { email: { contains: args.search } },
              ],
            }
          : {};
        return context.prisma.user.findMany({
          where,
          skip: args?.skip ?? undefined,
          take: args?.take ?? undefined,
        });
      },
    });

    t.field("user", {
      type: "User",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(parent, args, context) {
        if (!context.userId) throw new ForbiddenError("Please Login.");
        const user = await context.prisma.user.findUnique({
          where: { id: context.userId },
        });
        if (!user) throw new ForbiddenError("User not found.");

        if (user.role !== "ADMIN") {
          throw new ForbiddenError("You are not allowed.");
        }
        return context.prisma.user.findUnique({
          where: { id: args?.id },
        });
      },
    });
  },
});
