module.exports = (req, res, next) => {
  res.status(404).json({ message: 'RESOURCE NOT FOUND ON THIS SERVER' });
};
