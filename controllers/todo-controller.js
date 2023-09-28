const prisma = require('../models/prisma');

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    const todo = await prisma.todo.create({
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
    res.status(201).json({ message: 'CREATED', todo });
  } catch (error) {
    next(error);
  }
};

exports.getAllTodo = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};
