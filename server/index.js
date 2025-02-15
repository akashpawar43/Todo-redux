const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./model/Todo');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

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

app.post("/add", async (req, res) => {
    try {
        const { title, description, priority, status, category, dueDate } = req.body;
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

app.patch("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority, status, category, dueDate } = req.body;
        const data = await Todo.findByIdAndUpdate({ _id: id }, { title, description, priority, status, category, dueDate });
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const del = await Todo.findOneAndDelete({ _id: id })
        res.json(del)
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
})