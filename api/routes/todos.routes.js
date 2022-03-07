const express = require('express');

const router = express.Router();

const {
  allTodos,
  allTodosId,
  createTodo,
  updateTodo,
  updateState
} = require('../controllers/todos.controller');

// Mostrar todos
router.get('/', allTodos);

// Mostrar todos por ID
router.get('/:id', allTodosId);

// Crear todo
router.post('/', createTodo);

// actualizar todo
router.put('/:id', updateTodo);

// soft delete
router.patch('/:id', updateState);

module.exports = { todosRouter: router };
