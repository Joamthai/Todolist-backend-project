const jwt = require('jsonwebtoken');
const prisma = require('../models/prisma');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: 'UNAUTHENTICATED' });
    }
    if (!authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'UNAUTHENTICATED' });
    }

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || 'very_secret'
    );

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      res.status(401).json({ message: 'UNAUTHENTICATED' });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
