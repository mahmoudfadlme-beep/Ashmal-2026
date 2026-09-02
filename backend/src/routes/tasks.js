import express from 'express';
const router = express.Router();

// Mock data
let tasks = [];

// GET all tasks
router.get('/', (req, res) => {
  try {
    const { status, assigneeId, priority } = req.query;
    let filtered = tasks;

    if (status) filtered = filtered.filter(t => t.status === status);
    if (assigneeId) filtered = filtered.filter(t => t.assigneeId === assigneeId);
    if (priority) filtered = filtered.filter(t => t.priority === priority);

    res.json({
      total: filtered.length,
      tasks: filtered
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single task
router.get('/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create task
router.post('/', (req, res) => {
  try {
    const newTask = {
      id: `task_${Date.now()}`,
      ...req.body,
      createdAt: Date.now(),
      status: 'receiving',
      stageDates: { receiving: new Date().toISOString().split('T')[0] },
      isPending: false,
      kpis: [],
      comments: []
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update task
router.put('/:id', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    Object.assign(task, req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE task
router.delete('/:id', (req, res) => {
  try {
    const index = tasks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Task not found' });

    const deleted = tasks.splice(index, 1);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tasks by status
router.get('/status/:status', (req, res) => {
  try {
    const filtered = tasks.filter(t => t.status === req.params.status);
    res.json({
      status: req.params.status,
      total: filtered.length,
      tasks: filtered
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tasks by assignee
router.get('/assignee/:assigneeId', (req, res) => {
  try {
    const filtered = tasks.filter(t => t.assigneeId === req.params.assigneeId);
    res.json({
      assigneeId: req.params.assigneeId,
      total: filtered.length,
      tasks: filtered
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add comment to task
router.post('/:id/comments', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const comment = {
      id: `cmt_${Date.now()}`,
      author: req.body.author,
      text: req.body.text,
      time: Date.now()
    };
    task.comments.push(comment);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST add KPI to task
router.post('/:id/kpis', (req, res) => {
  try {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const kpi = {
      id: `kpi_${Date.now()}`,
      ...req.body,
      date: new Date().toISOString().split('T')[0]
    };
    task.kpis.push(kpi);
    res.status(201).json(kpi);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
