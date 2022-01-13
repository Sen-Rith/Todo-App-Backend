import { ApolloServer} from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { app, prisma } from "./app.js";
import http from "http";
import { typeDefs } from "./schema.js";
import { Query } from "./resolvers/query.js";
import { Mutation } from "./resolvers/Mutation.js";
const corsOptions = {
  origin: '*',
  credentials: false
}

const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation,
	},
	context: {
		prisma,
	},
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
server.applyMiddleware({ app, cors: corsOptions });
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
