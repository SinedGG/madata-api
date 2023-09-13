module.exports = (fastify, opts, next) => {
  fastify.post("/push", require("./handler"));

  next();
};
