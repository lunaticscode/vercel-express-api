const express = require("express");
const connection = require("../db_init");
const router = express.Router();

const dummyUsers = [
  { id: "A0", name: "제우스", createdAt: new Date("2022-01-01") },
  { id: "A1", name: "헤라클레스", createdAt: new Date("2022-01-02") },
  { id: "A2", name: "헤파이토스", createdAt: new Date("2022-01-03") },
  { id: "A3", name: "아레스", createdAt: new Date("2022-01-04") },
];

const getUser = async () => {
  return await new Promise((resolve) => {
    connection.query("select * from user", (err, results) => {
      if (err) {
        console.log({ err });
        return resolve(false);
      }
      return resolve(results);
    });
  });
};

const getUserOne = async (id) => {
  return await new Promise((resolve) => {
    connection.query(`select * from user where id = ${id}`, (err, result) => {
      if (err) {
        console.log({ err });
        return resolve(false);
      }
      return resolve(result);
    });
  });
};

const insertUser = async (data) => {
  return await new Promise((resolve) => {
    connection.query(
      "insert into user (name, createdAt) values (?, ?)",
      [data.name, new Date()],
      (err, results) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        return resolve(true);
      }
    );
  });
};

router.get("/", async (req, res) => {
  const users = await getUser();
  return res.json(users);
});
router.post("/", async (req, res) => {
  const result = await insertUser(req.body);
  return res.json({ result, timestamp: new Date().getTime() });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUserOne(id);
  return res.json(user);
});
module.exports = router;
