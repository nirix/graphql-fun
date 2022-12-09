import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PostsAPI } from "./src/datasources/posts.js";
import { UsersAPI } from "./src/datasources/users.js";
import { CommentsAPI } from "./src/datasources/comments.js";
import { dataLoaders } from "./src/dataloaders.js";

const typeDefs = `#graphql
  type Query {
    posts: [Post]
  }
  type Post {
    id: ID!
    user: User
    title: String
    body: String
    comments: [Comment]
  }
  type User {
    id: ID!
    name: String
    email: String
  }
  type Comment {
    id: ID!
    postId: ID!
    email: String
    body: String
  }
  type Mutation {
    updatePost(
      id: ID!
      title: String!
      body: String!
      userId: ID!
  ): Post
  }
`;

const resolvers = {
  Query: {
    posts: async (_, __, { dataSources }) => dataSources.postsAPI.getAll()
  },
  Post: {
    user: ({ userId }, _, { dataLoaders }) => dataLoaders.usersLoader.load(userId),
    comments: ({ id }, _, { dataLoaders }) => dataLoaders.commentsLoader.load(id),
  },
  Mutation: {
    updatePost: async (_, { id, title, body, userId }, { dataSources }) => dataSources.postsAPI.updatePost(id, { title, body, userId }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
  context: async () => {
    const dataSources = {
      postsAPI: new PostsAPI(),
      usersAPI: new UsersAPI(),
      commentsAPI: new CommentsAPI(),
    }

    return {
      dataSources,
      dataLoaders: dataLoaders(dataSources)
    }
  }
});

console.log(`🚀  Server ready at: ${url}`);
