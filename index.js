require('./db');
const express = require('express');
const taskController = require('./controllers/taskController');


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/tasks', taskController.getAllTasks);
app.post('/tasks', taskController.createTask);
app.get('/tasks/:id', taskController.getTaskById);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);


app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
