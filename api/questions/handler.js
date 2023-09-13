module.exports = async (request, reply) => {
  const questions = require("./model");

  const data = request.body;

  var successful = data.length;

  for (item of data) {
    await questions.push(item.q, item.a).catch((err) => {
      successful--;
    });
  }
  reply.status(201).send({ successful });
};
