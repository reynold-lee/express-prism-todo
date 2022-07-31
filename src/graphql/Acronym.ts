import { objectType, nonNull, extendType, stringArg, intArg, arg } from "nexus";

export const Acronym = objectType({
  name: "Acronym",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("acronym_form");
    t.nonNull.string("full_form");
  },
});

export const AcronymQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("acronyms", {
      type: "Acronym",
      args: {
        search: stringArg(),
        skip: intArg(),
        take: intArg(),
      },
      resolve(parent, args, context) {
        const where = args.search
          ? {
              OR: [
                { acronym_form: { contains: args.search } },
                { full_form: { contains: args.search } },
              ],
            }
          : {};
        return context.prisma.acronym.findMany({
          where,
          skip: args?.skip ?? undefined,
          take: args?.take ?? undefined,
        });
      },
    });

    t.field("acronym", {
      type: "Acronym",
      args: {
        id: intArg(),
      },
      resolve(parent, args, context) {
        return context.prisma.acronym.findUnique({
          where: { id: args?.id ?? undefined },
        });
      },
    });
  },
});

export const AcronymMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Acronym",
      args: {
        acronym_form: nonNull(stringArg()),
        full_form: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const newAcronym = context.prisma.acronym.create({
          data: {
            acronym_form: args.acronym_form,
            full_form: args.full_form,
          },
        });
        return newAcronym;
      },
    });

    t.field("patch", {
      type: "Acronym",
      args: {
        id: nonNull(intArg()),
        acronym_form: stringArg(),
        full_form: stringArg(),
      },
      async resolve(parent, args, context) {
        const originAcronym = await context.prisma.acronym.findUnique({
          where: { id: args?.id },
        });
        const updateAcronym = context.prisma.acronym.update({
          where: {
            id: args?.id,
          },
          data: {
            acronym_form: args.acronym_form
              ? args.acronym_form
              : originAcronym?.acronym_form,
            full_form: args.full_form
              ? args.full_form
              : originAcronym?.full_form,
          },
        });
        return updateAcronym;
      },
    });

    t.nonNull.field("delete", {
      type: "Acronym",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        return context.prisma.acronym.delete({
          where: { id: args?.id },
        });
      },
    });
  },
});
