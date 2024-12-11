const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Token required' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    const userData = await prisma.user.findUnique({
        where: {
            id: user.userId
        },
        include: {
            borrowRecords: {
                include: {
                    equipment: {
                        include: {
                            category: true
                        } 
                    }
                }
            }
        }
    });
    if (!userData) return res.status(403).json({ message: 'User Not Found!' });
    req.user = userData;
    next();
  });
};

const authorizeAdmin = async (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };
