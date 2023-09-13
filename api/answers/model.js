const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async get(q) {
    return await prisma.answers.findMany({
      where: {
        question: {
          text: q,
        },
      },
      select: {
        text: true,
      },
    });
  },
  async withQuestion(q) {
    return await prisma.answers.findMany({
      where: {
        question: {
          text: q,
        },
      },
      select: {
        text: true,
        question: {
          select: {
            text: true,
          },
        },
      },
    });
  },
};
