const express = require("express");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cors = require("cors");

const {
  _makeUserData,
  _apiDataList,
  _licenseDataList,
  _prodDataList,
} = require("./makeData");
const app = express();

const PORT = 8888;

require("./db_init");

// const ticketsRouter = require("./routers/tickets.router");
// const usersRouter = require("./routers/users.router");
// const postRouter = require("./routers/post.router");
// const foundationRouter = require("./routers/foundation.router");
// const { insertQna } = require("./services/qna.service");
const apiController = require("./controller");
app.use(cors());
app.use(express.json());

// const policyRouter = require("./routers/policy.router");
// const userRouter = require("./routers/user.router");
// const dummyInsertRouter = require("./routers/dummyInsert.router");
// const dummyProductRouter = require("./routers/product.router");

const sleep = async (time = 500) =>
  await new Promise((resolve) => setTimeout(() => resolve(), time));

// app.get("/user", (req, res) => {
//   return res.status(200).json({ result: _makeUserData() });
// });

// app.post("/user", (req, res) => {
//   const cnt = req.body.count || 0;
//   let resultData;
//   if (!cnt) {
//     resultData = [];
//     return res.status(200).json({ result: resultData });
//   }
//   resultData = new Array(cnt).fill(0).map((elem) => {
//     return _makeUserData();
//   });
//   return res.status(200).json({ result: resultData });
// });

// app.get("/dummy/sleep-5", async (req, res) => {
//   await sleep(5000);
//   return res.json({ result: true, msg: "delay 10 seconds reponse." });
// });

// app.get("/dummy/error", (req, res) => {
//   throw new Error("Trigger Server-error");
// });

// app.get("/dummy/cart", async (req, res) => {
//   await sleep();
//   return res.json({ data: cartData });
// });

// app.get("/dummy/test", async (req, res) => {
//   res.json([{ a: 1 }]);
// });

// app.use("/dummy/insert", dummyInsertRouter);
// app.use("/dummy/policy", policyRouter);
// app.use("/dummy/users", userRouter);
// app.use("/dummy/products", dummyProductRouter);

// app.use("/tickets", ticketsRouter);
// app.use("/qna", postRouter);
// app.use("/users", usersRouter);
// app.use("/api/foundation", foundationRouter);

app.use("/api", apiController);

// app.listen(PORT, () => {
//   // dummyInsertData();
//   console.log(`Express running on ${PORT}`);
// });

module.exports = app;
