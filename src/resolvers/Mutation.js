export const Mutation = {
	addList: async (parent, { input }, { prisma, pubsub }) => {
		pubsub.publish("UPDATE_LIST", { updateAllList: true });
		await prisma.list.create({
			data: {
				...input,
			},
		});
		return true;
	},
	deleteList: async (parent, { id }, { prisma, pubsub }) => {
		pubsub.publish("UPDATE_LIST", { updateAllList: true });
		await prisma.task.deleteMany({
			where: {
				listId: id,
			},
		});
		await prisma.list.delete({
			where: {
				id: id,
			},
		});
		return true;
	},
	updateList: async (parent, { input }, { prisma, pubsub }) => {
		pubsub.publish("UPDATE_LIST", { updateAllList: true });
		await prisma.list.update({
			where: {
				id: input.id,
			},
			data: {
				title: input.title,
			},
		});
		return true;
	},
	addTask: async (parent, { input }, { prisma, pubsub }) => {
		pubsub.publish("UPDATE_LIST", { updateAllList: true });
		await prisma.list.findUnique({
			where: {
				id: input.listId,
			},
		});
		await prisma.task.create({
			data: {
				...input,
			},
		});
		return true;
	},
	deleteTask: async (parent, { id }, { prisma, pubsub }) => {
		pubsub.publish("UPDATE_LIST", { updateAllList: true });
		await prisma.task.delete({
			where: {
				id: id,
			},
		});
		return true;
	},
	updateTask: async (parent, { input }, { prisma, pubsub }) => {
		pubsub.publish("UPDATE_LIST", { updateAllList: true });
		await prisma.task.update({
			where: {
				id: input.id,
			},
			data: {
				...input,
			},
		});
		return true;
	},
};
