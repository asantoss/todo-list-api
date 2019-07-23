var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [{
    id: 1,
    todo: "Implement a REST API"
},
{
    id: 2,
    todo: "Add a third todo item"
},
];

// GET /api/todos
app.get('/api/todos', function (req, res, next) {
    res.json(todoList);
})

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res, next) => {
    let todo = todoList.find(todo => todo.id === Number.parseInt(req.params.id));
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({
            error: `Todo with id of ${req.params.id} not found`
        });
    }
})

// POST /api/todos
app.post('/api/todos', (req, res, next) => {
    // let nextId = Math.max(...todoList.map(id => { todoList.id })) + 1
    let nextId = todoList.reduce((prev, curr) => {
        return prev.id > curr.id ? prev.id : curr.id;
    }, 0) + 1;
    let todo = {
        id: nextId,
        todo: req.body.todo,
    }
    todoList.push(todo);
    res.json(todo);
})

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res, next) => {
    //? req.params.id
    //? req.body.todo
    const todoObj = todoList.find(todo => todo.id == parseInt(req.params.id));
    const otherTodos = todoList.filter(todo => todo.id != parseInt(req.params.id));
    if (todoObj) {
        todoObj.todo = req.body.todo;
        todoList = otherTodos.concat(todoObj);
        res.json(todoObj);
    } else {
        res.status(404).json({ error: 'todo not found' });
    }
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res, next) => {
    todoList = todoList.filter(todo => todo.id != parseInt(req.params.id));
    res.json(todoList);
})

app.listen(3000, function () {
    console.log('Todo List API is now listening on port 3000...');
})