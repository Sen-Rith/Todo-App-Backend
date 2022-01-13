import pubsub from "../pubsub.js";
export const Subscription = {
	updateAllList: {
		subscribe: () => pubsub.asyncIterator("UPDATE_LIST"),
	},
};
