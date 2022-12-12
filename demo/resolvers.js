'use strict';

const resolvers = {
  Article: {
    articleId: ({ article_id }, _, context) => {
      return article_id;
    },
    title: ({ title }, _, context) => {
      return title;
    },
    author: ({ author_id }, _, context) => {
      return context.loaders.user.load(author_id);
    }
  },
  Query: {
    article: (_, { articleId }, context) => {
      return context.loaders.article.load(articleId);
    },
    articles: async (_, { limit = 20, offset = 0, sort = null }, context) => {
      const { rows, fields } = await context.db.query('SELECT article_id FROM article LIMIT $1 OFFSET $2', [limit, offset]);
      return rows.map(({ article_id }) => context.loaders.article.load(article_id));
    },
    user: (_, { userId }, context) => {
      return context.loaders.user.load(userId);
    },
    users: async (_, { limit = 20, offset = 0, sort = null }, context) => {
      const { rows, fields } = await context.db.query('SELECT user_id FROM appuser LIMIT $1 OFFSET $2', [limit, offset]);
      return rows.map(({ user_id }) => context.loaders.user.load(user_id));
    }
  },
  User: {
    userId: ({ user_id }, _, context) => {
      return user_id;
    },
    name: ({ name }, _, context) => {
      return name;
    },
    follows: async ({ user_id }, _, context) => {
      const { rows, fields } = await context.db.query('SELECT follows_id FROM user_follow WHERE user_id = $1', [user_id]);
      return rows.map(({ follows_id }) => context.loaders.user.load(follows_id));
    },
    articles: async ({ user_id }, _, context) => {
      const { rows, fields } = await context.db.query('SELECT article_id FROM article WHERE author_id = $1', [user_id]);
      return rows.map(({ article_id }) => context.loaders.article.load(article_id));
    }
  }
};


module.exports = resolvers;
