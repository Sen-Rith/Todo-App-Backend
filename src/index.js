import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { app, prisma } from "./app.js";
import http from "http";
import { typeDefs } from "./schema.js";
import resolvers from "./resolvers/index.js";
import graphql from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import pubsub from "./pubsub.js";

const { execute, subscribe } = graphql;
const schema = makeExecutableSchema({ typeDefs, resolvers });
const httpServer = http.createServer(app);
const subscriptionServer = SubscriptionServer.create(
	{
		schema,
		execute,
		subscribe,
	},
	{
		server: httpServer,
		path: "/subscription",
	}
);
const server = new ApolloServer({
	schema,
	context: {
		prisma,
		pubsub,
	},
	formatParams: (params) => {
		const { variables, ...rest } = params;
		return {
			variables: omitDeep(variables, "__typename"),
			...rest,
		};
	},
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		{
			async serverWillStart() {
				return {
					async drainServer() {
						subscriptionServer.close();
					},
				};
			},
		},
	],
});
await server.start();
server.applyMiddleware({ app });
httpServer.listen({ port: 4000 }, () => {
	console.log(
		`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
	);
});
