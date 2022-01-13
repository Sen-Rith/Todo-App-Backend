export const Query = {
  lists: async (parent, { id }, { prisma }) => {
    try {
      const lists = await prisma.list.findMany({
        orderBy: {
          id: "asc",
        },
        include: {
          tasks: true,
        },
      });
      return lists;
    } catch (error) {
      return error.message
    }
  }
};
