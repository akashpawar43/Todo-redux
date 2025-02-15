const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        min: 3,
        required: true,
    },
    description: {
        type: String,
        min: 5,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        default: 'Medium',
    },
    status: {
        type: String,
        default: 'Pending',
    },
    category: {
        type: String,
        default: 'Work',
    },
    dueDate: {
        type: Date,
        default: new Date(),
    }
})

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;