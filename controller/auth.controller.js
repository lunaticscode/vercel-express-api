const authController = require("express").Router();

authController.get("/signin", (req, res) => {
  res.cookie("accessToken", "humanwater-auth-token", {
    httpOnly: true,
    path: "/",
  });
  return res.status(204).json({ result: true });
});

authController.get("/signout", (req, res) => {
  res.cookie("accessToken", "", { maxAge: 0 });
  return res.status(204).json({ result: true });
});

authController.get("/", (req, res) => {
  const cookies = req.headers.cookie?.toString().split(";");
  const accessTokenCookie = cookies?.find((cookie) =>
    cookie.includes("accessToken=")
  );
  let accessToken = "";
  if (accessTokenCookie) {
    accessToken = accessTokenCookie.split("accessToken=")[1];
  }

  if (accessToken === "humanwater-auth-token") {
    return res.status(200).json({ result: true });
  } else {
    return res
      .status(401)
      .json({ result: false, message: "(!) Invalid AccessToken" });
  }
});
module.exports = authController;
