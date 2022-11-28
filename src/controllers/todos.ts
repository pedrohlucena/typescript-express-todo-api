import { RequestHandler } from "express"
import Todo from "../models/todo"

const TODOS: Array<Todo> = []

export const getTodos: RequestHandler = (_, res, _2) => {
    res.status(200).json({todos: TODOS})
}

export const createTodo: RequestHandler = (req, res, _) => {
    const text = (req.body as {text: string}).text
    const newTodo = new Todo(Math.random().toString(), text)
    TODOS.push(newTodo)
    res.status(201).json({message: 'Todo created successfully', createdTodo: newTodo})
}

export const updateTodo: RequestHandler = (req, res, _) => {
    const todoId = (req.params as {id: string}).id
    const updatedText = (req.body as {text: string}).text

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if(todoIndex < 0) {
        throw new Error('Could not find the index')
    }

    TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

    res.status(200).json({message: 'Todo updated successfully', updatedTodo: TODOS[todoIndex]})
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, _) => {
    const todoId = (req.params as {id: string}).id

    const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

    if(todoIndex < 0) {
        throw new Error('Could not find the index')
    }

    TODOS.splice(todoIndex, 1)

    res.status(200).json({message: 'Todo deleted successfully'})
}