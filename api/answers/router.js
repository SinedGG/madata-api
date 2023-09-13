module.exports = (fastify, opts, next) => {
  fastify.get("/", require("./handlers/get"));

  fastify.get("/withQuestion", require("./handlers/withQuestion"));
  next();
};
