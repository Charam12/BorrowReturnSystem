const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getEquipment = async (req, res) => {
  const equipment = await prisma.equipment.findMany({ include: { category: true } });
  res.json(equipment);
};

const createEquipment = async (req, res) => {
  const { name, description, serial, img, categoryId, status } = req.body;
  const equipment = await prisma.equipment.create({
    data: { name, description, serial, categoryId, status, img },
  });
  res.json(equipment);
};

const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { name, description, serial, img, categoryId, status } = req.body;

  const oldEquipment = await prisma.equipment.findUnique({ where: { id: parseInt(id) } });

  const equipment = await prisma.equipment.update({
    where: { id: parseInt(id) },
    data: { 
      name: name ? name : oldEquipment.name, 
      description: description ? description : oldEquipment.description, 
      serial: serial ? serial : oldEquipment.serial,
      img: img ? img : oldEquipment.img, 
      categoryId: categoryId ? categoryId : oldEquipment.categoryId, 
      status: status ? status : oldEquipment.status
    },
  });
  res.json(equipment);
};

const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  await prisma.equipment.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Equipment deleted successfully' });
};

module.exports = { getEquipment, createEquipment, updateEquipment, deleteEquipment };
