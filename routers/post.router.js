const {
  getQnaPagedList,
  updateQna,
  insertQna,
  getOneQna,
} = require("../services/qna.service");

const router = require("express").Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id || !Number(id)) {
    return res.status(400).json({
      isError: true,
      message: "(!) id가 유효하지 않습니다. 다시 확인해주세요.",
    });
  }

  const getResult = await getOneQna({ id });
  if (!getResult) {
    return res.status(404).json({
      isError: false,
      data: null,
      message: "데이터가 없습니다.",
    });
  }

  return res.status(200).json({ isError: false, data: getResult });
});

router.get("/", async (req, res) => {
  const { page } = req.query;
  if (!page || !Number(page)) {
    return res.status(400).json({
      isError: true,
      message: "(!) page가 유효하지 않습니다. 다시 확인해주세요.",
    });
  }
  const getResult = await getQnaPagedList({ page });
  if (getResult) {
    return res.status(200).json({ isError: false, data: getResult });
  } else {
    return res.status(500).json({
      isError: true,
      message: "(!) 서버 오류, 관리자에게 문의해주세요.",
    });
  }
});

router.post("/", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!(token === "humanwater")) {
    return res.status(401).json({ isError: true });
  }
  const insertResult = await insertQna(req.body);
  return res.status(201).json({ isError: !insertResult });
});

router.patch("/", async (req, res) => {
  const { id, answer } = req.body;
  if (!id || !answer) {
    return res.status(400).json({
      isError: true,
      message: "(!) id, answer가 유효하지 않습니다. 다시 확인해주세요.",
    });
  }
  const updateResult = await updateQna({ id, answer });
  if (!updateResult) {
    return res.status(500).json({
      isError: true,
      message: "(!) 업데이트 오류, 관리자에게 문의해주세요.",
    });
  }
  return res.status(200).json({ isError: false, message: "업데이트 완료" });
});

module.exports = router;
