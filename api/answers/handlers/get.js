module.exports = async (request, reply) => {
  const answer = require("../model");
  const { q } = request.query;

  const answers = await answer.get(q);

  reply.status(200).send(answers);
};
