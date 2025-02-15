const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    complete: {
        type: Boolean,
        default: false
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
    }
})

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;