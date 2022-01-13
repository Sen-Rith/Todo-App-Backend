export const Query = {
	lists: async (parent, { id }, { prisma }) => {
		const lists = await prisma.list.findMany({
			orderBy: {
				id: "asc",
			},
			include: {
				tasks: true,
			},
		});
		return lists;
	},
};
