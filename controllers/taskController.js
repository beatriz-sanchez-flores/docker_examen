const Task = require('../models/task');

// Controlador para crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controlador para obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().lean();
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).send('Error al obtener las tareas');
  }
  };
  
  // Controlador para obtener una tarea por su ID
  const getTaskById = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
      }
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Controlador para actualizar una tarea por su ID
  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, completed } = req.body;
      const task = await Task.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
      }
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  // Controlador para eliminar una tarea por su ID
  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Tarea no encontrada' });
      }
      res.json({ success: true, data: task });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
  };