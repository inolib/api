import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    articleCategories: (_, args, context) => context.prisma.articleCategory.findMany(),
  },

  Query: {
    article: (_, args, context) => context.prisma.article.findMany(),
  },

  Mutation: {
    newArticle: async (_, args, context) => {
      const article = await context.prisma.article.upsert({
        where: { id: "" },
        update: {},
        create: {
          articleId: args.articleId,
          title: args.title,
          content: args.content,
          image: args.image,
        },
      });
      return article;
    },
  },
};
