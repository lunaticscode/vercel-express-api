const dbConnection = require("../db_init");

const updateQna = async (data) => {
  const { answer, id } = data;
  return await new Promise(async (resolve) => {
    dbConnection.query(
      "update qna set answer = ?, isDone = true where id = ?",
      [answer, id],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        console.log(result);
        return resolve(true);
      }
    );
  });
};

const insertQna = async (data) => {
  const { title, content } = data;
  return await new Promise(async (resolve) => {
    dbConnection.query(
      "insert into qna (title, content) values (?, ?)",
      [title, content],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        console.log(result);
        return resolve(true);
      }
    );
  });
};

const getCountQnaTable = async () => {
  return await new Promise((resolve) => {
    dbConnection.query(`SELECT COUNT(*) as cnt FROM qna`, (err, result) => {
      if (err) {
        return resolve(null);
      }
      return resolve(result[0].cnt);
    });
  });
};

const getOneQna = async (data) => {
  const { id } = data;
  return await new Promise((resolve) => {
    dbConnection.query(
      `SELECT * from qna where id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return resolve(null);
        }
        return resolve(result[0]);
      }
    );
  });
};

const getQnaPagedList = async (data) => {
  const { page } = data;
  return await new Promise(async (resolve) => {
    const count = await getCountQnaTable();
    console.log({ count });
    dbConnection.query(
      `select * from qna order by createdAt desc limit 10 offset ${
        (page - 1) * 10
      }`,
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        if (!result) {
          return resolve({ contents: [], totalElements: count, page });
        }
        return resolve({ contents: result, totalElements: count, page });
      }
    );
  });
};

module.exports = {
  getQnaPagedList,
  updateQna,
  insertQna,
  getOneQna,
};
