const dbConnection = require("../db_init");
const insertUser = async (data) => {
  const { email, password } = data;
  return await new Promise(async (resolve) => {
    const isExist = await isExistUser(data);
    if (isExist) {
      return resolve({ isError: true, code: 1 });
    }
    dbConnection.query(
      "insert into users (email, password) values (?, ?)",
      [email, password],
      (err) => {
        if (err) {
          console.log({ err });
          return resolve({ isError: true, code: 2 });
        }
        return resolve({ isError: false });
      }
    );
  });
};

const getUser = async (data) => {
  const { email } = data;
  return await new Promise((resolve) => {
    dbConnection.query(
      "select * from users where email=?",
      [email],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        const userData = result[0];
        if (!userData) {
          return resolve(false);
        }
        const { password, ...rest } = userData;
        return resolve(rest);
      }
    );
  });
};

const isExistUser = async (data) => {
  const { email } = data;
  return await new Promise((resolve, reject) => {
    dbConnection.query(
      "select count(*) as count from users where email=?",
      [email],
      (err, result) => {
        if (err) {
          console.log({ err });
          return resolve(false);
        }
        const count = result[0].count;
        if (count) {
          return resolve(true);
        } else {
          return resolve(false);
        }
      }
    );
  });
};

module.exports = {
  insertUser,
  isExistUser,
  getUser,
};
