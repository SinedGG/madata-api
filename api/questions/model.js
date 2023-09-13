const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  push(q, a) {
    return new Promise(async (resolve, reject) => {
      var question = await prisma.questions.findUnique({
        where: {
          text: q,
        },
      });

      if (!question) {
        question = await prisma.questions.create({
          data: {
            text: q,
          },
        });
      }

      await prisma.answers
        .create({
          data: {
            text: a,
            questionId: question.id,
          },
        })
        .catch((err) => {
          if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === "P2002"
          )
            reject();
        });

      resolve();
    });
  },
};
