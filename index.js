import pris from "@prisma/client";
import express from "express";
import cors from "cors";

const { Prisma, PrismaClient } = pris;
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

app.post("/list", async (req, res) => {
	const { title } = req.body;
	if (!title) {
		res.send("No input");
	} else {
		try {
			const newList = await prisma.list.create({
				data: {
					title: title,
				},
			});
			res.send(newList);
		} catch (error) {
			res.send("Invalid");
		}
	}
});

app.delete("/list/:listId", async (req, res) => {
	const listId = parseInt(req.params.listId);
	try {
		await prisma.task.deleteMany({
			where: {
				listId: listId,
			},
		});
		await prisma.list.delete({
			where: {
				id: listId,
			},
		});
		res.send("Deleted");
	} catch (error) {
		res.send(error.message);
	}
});

app.get("/allList", async (req, res) => {
	try {
		const task = await prisma.list.findMany({
			orderBy: {
				id: "asc",
			},
			include: {
				tasks: true,
			},
		});
		res.send(task);
	} catch (error) {
		res.send(error.message);
	}
});

app.patch("/list/:listId", async (req, res) => {
	const { title } = req.body;
	const listId = parseInt(req.params.listId);
	try {
		await prisma.list.update({
			where: {
				id: listId,
			},
			data: {
				title: title,
			},
		});
		res.send("Updated");
	} catch (error) {
		res.send("Invalid");
	}
});

app.post("/task/:listId", async (req, res) => {
	const { title, description } = req.body;
	const listId = parseInt(req.params.listId);
	if (!title || !description) {
		res.send("Invalid input");
	} else {
		try {
			const list = await prisma.list.findUnique({
				where: {
					id: listId,
				},
			});
			const task = await prisma.task.create({
				data: {
					title: title,
					description: description,
					completed: false,
					listId: list.id,
				},
			});
			res.send(task);
		} catch (error) {
			res.send(error.message);
		}
	}
});

app.get("/task/:listId", async (req, res) => {
	const listId = parseInt(req.params.listId);
	try {
		const tasks = await prisma.task.findMany({
			where: {
				listId: listId,
			},
		});
		res.send(tasks);
	} catch (error) {
		res.send(error.message);
	}
});

app.delete("/task/:taskId", async (req, res) => {
	const taskId = parseInt(req.params.taskId);
	try {
		await prisma.task.delete({
			where: {
				id: taskId,
			},
		});
		res.send("Deleted");
	} catch (error) {
		res.send(error.message);
	}
});

app.patch("/task/:taskId", async (req, res) => {
	const taskId = parseInt(req.params.taskId);
	try {
		await prisma.task.update({
			where: {
				id: taskId,
			},
			data: {
				...req.body,
			},
		});
		res.send("Updated");
	} catch (error) {
		res.send(error.message);
	}
});

app.patch("/update/:taskId/:listId", async (req, res) => {
	const listId = parseInt(req.params.listId);
	const taskId = parseInt(req.params.taskId);
	try {
		const updateTask = await prisma.task.update({
			where: {
				id: taskId,
			},
			data: {
				listId: listId,
			},
		});
		res.send(updateTask);
	} catch (error) {
		res.send(error.message);
	}
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
