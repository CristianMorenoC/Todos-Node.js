const express = require('express');

const { Todo } = require('../models/todo.model');

exports.allTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { status: 'active' } });

    res.status(200).json({
      status: 'success',
      data: {
        todos
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.allTodosId = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: { id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'No to do found, check the ID'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        todo
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { id, content } = req.body;

    const newTodo = await Todo.create({
      id,
      content
    });

    res.status(201).json({
      status: 'success',
      data: { newTodo }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const todo = await Todo.findOne({
      where: {
        id,
        status: 'active'
      }
    });

    await todo.update({
      content
    });

    if (!content || content.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Insert a content please'
      });
    }

    res.status(200).json({
      status: 'success'
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateState = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: {
        id,
        status: 'active'
      }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete because the ID is wrong'
      });
    }

    await todo.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
