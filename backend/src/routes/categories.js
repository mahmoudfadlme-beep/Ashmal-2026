import express from 'express';
const router = express.Router();

// Mock data
let categories = [];

// GET all categories
router.get('/', (req, res) => {
  try {
    res.json({
      total: categories.length,
      categories: categories
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single category
router.get('/:id', (req, res) => {
  try {
    const category = categories.find(c => c.id === req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create category
router.post('/', (req, res) => {
  try {
    const newCategory = {
      id: `cat_${Date.now()}`,
      ...req.body
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update category
router.put('/:id', (req, res) => {
  try {
    const category = categories.find(c => c.id === req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    Object.assign(category, req.body);
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE category
router.delete('/:id', (req, res) => {
  try {
    const index = categories.findIndex(c => c.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Category not found' });

    const deleted = categories.splice(index, 1);
    res.json(deleted[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
