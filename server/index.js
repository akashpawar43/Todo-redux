const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./model/Todo');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const { z } = require('zod');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL)
    .then(console.log("Database is Connected"))
    .catch(err => console.log(err))

app.get('/', async (req, res) => {
    try {
        const data = await Todo.find()
        res.json(data);
    } catch (error) {
        console.log(error);
    }
})

app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const up = await Todo.findByIdAndUpdate({ _id: id }, { complete: true })
        res.json(up)
    } catch (error) {
        console.log(error);
    }
})

const addTodoSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "description must be at least 5 characters"),
    priority: z.enum(["Low", "Medium", "High", "Urgent"]).default("Medium"),
    status: z.enum(["Pending", "In Progress", "Completed", "Archived"]).default("Pending"),
    category: z.enum(["Personal", "Work", "Shopping", "Fitness"]).default("Work"),
    dueDate: z.preprocess((arg) => (typeof arg === "string" ? new Date(arg) : arg), z.date())
})

app.post("/add", async (req, res) => {
    try {
        const parsed = addTodoSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() });
        }
        const { title, description, priority, status, category, dueDate } = parsed.data;

        const data = await Todo.create({
            title: title,
            description: description,
            priority,
            status,
            category,
            dueDate
        })
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.get("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Todo.findById({ _id: id });
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Zod schema for ID validation
const idSchema = z.string().refine((id) => isValidObjectId(id), {
  message: "Invalid MongoDB ObjectId",
});

app.patch("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const idValidation = idSchema.safeParse(id);
        if (!idValidation.success) {
            return res.status(400).json({ error: idValidation.error.format() });
        }

        const parsed = addTodoSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.format() });
        }
        const { title, description, priority, status, category, dueDate } = parsed.data;
        const data = await Todo.findByIdAndUpdate({ _id: id }, { title, description, priority, status, category, dueDate });
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idValidation = idSchema.safeParse(id);
        if (!idValidation.success) {
            return res.status(400).json({ error: idValidation.error.format() });
        }
        const del = await Todo.findOneAndDelete({ _id: id })
        res.json(del)
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
})