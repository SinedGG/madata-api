require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

//app.use(cors({ credentials: true, origin: true }));
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

app.post("/getAnswer", async (req, res) => {
  const question = req.query.question;
  console.log(question);
  const [answer] = await db.query(
    `SELECT answers.text FROM questions INNER join answers ON questions.id = answers.question_id WHERE questions.text = '${question}'`
  );
  res.json({ answer: answer });
});

app.post("/getFullAnswer", async (req, res) => {
  const question = req.query.question;
  const [out] = await db.query(
    `SELECT questions.text as questions, answers.text as answers FROM questions INNER join answers ON questions.id = answers.question_id WHERE questions.text = '${question}'`
  );
  res.json({ out });
});

app.post("/pushAnswer", async (req, res) => {
  const question = req.query.question;
  const answer = req.query.answer;
  if (question && answer) {
    await db
      .query(`insert into questions(text) values("${question}")`)
      .catch((err) => {});
    try {
      await db.query(
        `insert into answers(text, question_id) values("${answer}", (select id from questions where text = "${question}"))`
      );
      res.status(201).send("OK");
    } catch (err) {
      if (err.message.includes(`Duplicate entry`)) {
        console.log(`Duplicate ${question} - ${answer}`);
        res.json({ message: "NOT OK" });
      }
    }
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
