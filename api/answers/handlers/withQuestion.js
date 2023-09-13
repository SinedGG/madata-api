module.exports = async (request, reply) => {
  const answer = require("../model");
  const { q } = request.query;

  const answers = await answer.withQuestion(q);

  var out = [];

  answers.forEach((item) => {
    out.push({
      q: item.question.text,
      a: item.text,
    });
  });

  reply.status(200).send(out);
};
