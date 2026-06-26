const cors = require('cors');
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(express.json());

// GET all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// POST create a task
app.post('/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const task = await prisma.task.create({
      data: { title }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT update a task (mark done)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { done: true }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});
// PATCH update specific fields
app.patch('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { done, title } = req.body;
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { done, title }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Task deleted!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
// GET single task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) }
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});