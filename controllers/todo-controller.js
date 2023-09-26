const prisma = require('../models/prisma');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    await prisma.todo.create({
      data: {
        title,
        completed,
        dueDate,
        // userId: req.user.id
        user: {
          connect: req.user,
        },
      },
    });
  } catch (error) {
    next(error);
  }
  res.status(201).json({ message: 'CREATED' });
};
