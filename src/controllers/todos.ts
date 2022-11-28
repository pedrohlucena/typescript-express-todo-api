import { RequestHandler } from "express"
import Todo from "../models/todo"

const TODOS: Array<Todo> = []

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).json({todos: TODOS})
}

export const createTodo: RequestHandler = (req, res, _) => {
    const text = (req.body as {text: string}).text
    const newTodo = new Todo(Math.random().toString(), text)
    TODOS.push(newTodo)
    res.status(201).json({message: 'Todo created successfully', createdTodo: newTodo})
}