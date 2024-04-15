const authController = require("./auth.controller");

const apiController = require("express").Router();

apiController.get("/test", (req, res) => {
  return res
    .status(200)
    .json({ result: true, message: "Success to API Test." });
});
apiController.use("/auth", authController);

module.exports = apiController;
