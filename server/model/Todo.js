const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    complete: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('todos', TodoSchema);

module.exports = Todo;