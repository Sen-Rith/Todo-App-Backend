import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type Query {
		lists: [List]!
	}

	type Mutation {
		addList(input: AddListInput!): Boolean!
		deleteList(id: Int!): Boolean!
		updateList(input: UpdateListInput!): Boolean!
		addTask(input: AddTaskInput!): Boolean!
		deleteTask(id: Int!): Boolean!
		updateTask(input: UpdateTaskDetail!): Boolean!
	}

	type Subscription {
		updateAllList: Boolean
	}

	type Task {
		id: ID!
		title: String!
		description: String
		completed: Boolean
	}

	type List {
		id: ID!
		title: String!
		tasks: [Task]
	}

	input AddListInput {
		title: String!
	}

	input UpdateListInput {
		title: String!
		id: Int!
	}

	input AddTaskInput {
		listId: Int!
		title: String!
		description: String
		completed: Boolean
	}

	input UpdateTaskDetail {
		id: Int!
		listId: Int
		title: String
		description: String
		completed: Boolean
	}
`;
