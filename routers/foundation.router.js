const router = require("express").Router();

router.get("/", (req, res) => {
  return res.status(200).json(["1.0.1", "1.0.0"]);
});

module.exports = router;
