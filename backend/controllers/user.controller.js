const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const authen = async (req, res) => {
    res.json(req.user);
}

const createUser = async (req, res) => {
  const { username, password, firstName, lastName, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, password: hashedPassword, firstName, lastName, role },
  });

  res.json(user);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token });
};

const updateProfile = async (req, res) => {
  const { password, firstName, lastName, profileImg, oldPassword } = req.body;

  let hashedPassword = undefined;

  if (oldPassword && password) {
    const checkPassword = await bcrypt.compare(oldPassword, req.user.password);
    if (!checkPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const updateData = { firstName, lastName };
  
  if (hashedPassword) {
    updateData.password = hashedPassword;
  }

  const user = await prisma.user.update({
    where: {
      id: req.user.id,
    },
    data: updateData,
  });

  res.json(user);
};


module.exports = { getUsers, createUser, loginUser, authen, updateProfile };
