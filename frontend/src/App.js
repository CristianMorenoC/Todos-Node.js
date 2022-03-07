import { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Form from './components/form/form.component';
import TodoList from './components/todo-list/todo-list.component';

import './App.css';

const App = () => {
	// State
	const [todos, setTodos] = useState([]);

	const server = 'http://localhost:4000/api/v1/todos/';

	const addTodo = async todo => {
		await axios.post(`${server}`, {
			id: todo.id,
			content: todo.content,
		}); // req.body.content

		setTodos(prevState => [...prevState, todo]);
	};

	const fetchTodos = async () => {
		const res = await axios.get(`${server}`);

		const resTodos = res.data.data.todos;
		console.log(resTodos);
		setTodos(resTodos);
	};

	const editTodo = async (id, newContent) => {
		await axios.put(`${server}${id}`, {
			content: newContent,
		});

		setTodos(prevState => {
			const currentTodos = prevState;

			const todoIndex = currentTodos.findIndex(todo => +todo.id === +id);

			const updatedTodo = currentTodos[todoIndex];

			updatedTodo.content = newContent;

			currentTodos[todoIndex] = updatedTodo;

			return [...currentTodos];
		});
	};

	const deleteTodo = async id => {
		await axios.patch(`${server}/${id}`);

		setTodos(prevState => {
			const currentTodos = prevState;

			const updatedTodos = currentTodos.filter(todo => +todo.id !== +id);

			return [...updatedTodos];
		});
	};

	// When component is mounted, fetch todos
	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<div className="app">
			<Form onAddTodo={addTodo} />
			<TodoList onDeleteTodo={deleteTodo} onEditTodo={editTodo} items={todos} />
		</div>
	);
};

export default App;
