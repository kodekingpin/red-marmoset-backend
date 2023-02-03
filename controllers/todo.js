const Todo = require("../models/todo");

exports.createTodo = (req, res, next) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
    });
    todo
        .save()
        .then((result) => {
            res.status(201).json({
                message: "Todo added succesfully",
                post: {
                    ...result,
                    id: result._id,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Fail to create todo!",
            });
        });
};

const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currPage = +req.query.page;
    const todoQuery = Todo.find();
    let fetchedTodo;
    if (pageSize && currPage) {
        todoQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    todoQuery
        .then((doc) => {
            fetchedTodo = doc;
            return Todo.countDocuments();
        })
        .then((count) => {
            res.status(200).json({
                message: "All Todos fetched 200!",
                post: fetchedTodo,
                maxPosts: count,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching todo failed",
            });
        });
};

const Todo = require("../models/todo");

exports.getTodoById = (req, res, next) => {
    Todo.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Todo not found!" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching todo failed!",
            });
        });
};

const Todo = require("../models/todo");

exports.updateTodo = (req, res, next) => {
    const todo = new Todo({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
    });
    Todo.updateOne({ _id: rwq.params.id }, todo)
        .then((result) => {
            res.status(200).json({ message: "Update is successful!"
    });
        })
        .catch((errpr) => {
            res.status(500).json({
                message: "Couldn't update todo!",
            });
        });
};

const Todo = require("../models/todo");

exports.deleteTodo = (req, res, next) => {
    Todo.deleteOne({ _id: req.params.id })
        .then((resp) => {
            res.status(200).json({ message: "Delete is successful!" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Couldn't delete todo",
            });
        });
};