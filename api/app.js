// Create server Express
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./util/database');
const { todosRouter } = require('./routes/todos.routes');

// Init express app
const app = express();
app.set('port', process.env.PORT || 4000);

// Enable JSON incoming data
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

// Define endpoint for ToDos
app.use('/api/v1/todos', todosRouter);

sequelize
  .authenticate()
  .then(() => console.log('Database authenticated'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log(err));

app.listen(app.get('port'), () => {
  console.log('Express app running in port', app.get('port'));
});

// Establish a connection with a Database (Postgress)

// Create ToDo model
// Use the model to interact with the controller functions

// Must structure project with routes, controllers and models folders (utils)

// IMPORTANT: Prettier format

// Install cors library (npm i cors)
// app.use(cors())
