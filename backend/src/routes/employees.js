import express from 'express';
const router = express.Router();

// Mock data
let employees = [];

// GET all employees
router.get('/', (req, res) => {
  try {
    const { status, dept, role } = req.query;
    let filtered = employees;

    if (status) filtered = filtered.filter(e => e.status === status);
    if (dept) filtered = filtered.filter(e => e.dept === dept);
    if (role) filtered = filtered.filter(e => e.role === role);

    res.json({
      total: filtered.length,
      employees: filtered
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single employee
router.get('/:id', (req, res) => {
  try {
    const employee = employees.find(e => e.id === req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create employee
router.post('/', (req, res) => {
  try {
    const newEmployee = {
      id: `emp_${Date.now()}`,
      ...req.body,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update employee
router.put('/:id', (req, res) => {
  try {
    const employee = employees.find(e => e.id === req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    Object.assign(employee, req.body);
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE employee
router.delete('/:id', (req, res) => {
  try {
    const index = employees.findIndex(e => e.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Employee not found' });

    const deleted = employees.splice(index, 1);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
