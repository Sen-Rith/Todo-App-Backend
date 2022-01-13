export const Mutation = {
	addList: async (parent, { input }, { prisma }) => {
		try {
			const newList = await prisma.list.create({
				data: {
					...input,
				},
			});
			return newList;
		} catch (error) {
			return error.mesaage
		}
	},
	deleteList: async (parent, { id }, { prisma }) => {
		try {
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
		} catch (error) {
			return false;
		}
	},
	updateList: async (parent, { input }, { prisma }) => {
		try {
			await prisma.list.update({
				where: {
					id: input.id,
				},
				data: {
					title: input.title,
				},
			});
			return true;
		} catch (error) {
			return false;
		}
	},
	addTask: async (parent, { input }, { prisma }) => {
		try {
			const list = await prisma.list.findUnique({
				where: {
					id: input.listId,
				},
			});
			const task = await prisma.task.create({
				data: {
					...input
				},
			});
			return true
		} catch (error) {
			return false
		}
	},
  deleteTask: async (parent, { id }, { prisma }) => {
    try {
      await prisma.task.delete({
        where: {
          id: id,
        },
      });
      return true
    } catch (error) {
      return false
    }
  },
  updateTask: async (parent, { input }, { prisma }) => {
    try {
      await prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          ...input
        },
      });
      return true
    } catch (error) {
      return false
    }
  }
};
