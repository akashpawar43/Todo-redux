const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    complete: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        default: 'Low',
    },
    status: {
        type: String,
        default: 'Pending',
    },
    category: {
        type: String,
        default: 'Personal',
    },
    dueDate: {
        type: Date,
        default: new Date(),
    }
})

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;