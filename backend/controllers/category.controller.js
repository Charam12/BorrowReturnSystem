const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  const categorys = await prisma.category.findMany({
    include: {
      equipment: true 
    }
  });
  res.json(categorys);
};

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await prisma.category.create({
    data: { name },
  });
  res.json(category);
};

const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await prisma.category.findUnique({
    where: { id: parseInt(id) }
  });
  res.json(category);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await prisma.category.update({
    where: { id: parseInt(id) },
    data: { name },
  });
  res.json(category);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  await prisma.category.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Category deleted successfully' });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory, getCategory };
