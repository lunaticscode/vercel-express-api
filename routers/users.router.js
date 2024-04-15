const {
  insertUser,
  isExistUser,
  getUser,
} = require("../services/users.service");
const { getToken, validateToken } = require("../utils/token");

const router = require("express").Router();

const validateTokenMiddleware = (req, res, next) => {
  console.log(req.headers);
  const authorizationHeader =
    req.headers.authorization || req.headers.Authorization || null;
  if (!authorizationHeader) {
    return res.status(400).json({
      isError: true,
      message: "(!) Header의 Token을 다시 확인해주세요.",
    });
  }
  const token = authorizationHeader.split("Bearer ")[1];
  if (!validateToken(token)) {
    return res.status(401).json({
      isError: true,
      message: "(!) 유효하지 않은 토큰입니다. 다시 로그인 해주세요.",
    });
  }
  next();
};

const validateUserDataMiddleware = (req, res, next) => {
  const { email, password } = req.body;
  const isValid =
    email && email.trim().length && password && password.trim().length;
  if (!isValid)
    return res.status(400).json({
      isError: true,
      message: `(!) body 데이터를 다시 확인해주세요. \n ::: ${JSON.stringify(
        req.body
      )}`,
    });
  next();
};

router.get("/", validateTokenMiddleware, async (req, res) => {
  const tokenHeader =
    req.headers["authorization"] || req.headers["Authorization"] || null;
  const userData = validateToken(tokenHeader.split("Bearer ")[1]);
  const getUserResult = await getUser(userData);
  if (!getUserResult) {
    return res.json({
      isError: true,
      message: "(!) 유저 인증 실패, Token을 다시 확인해주세요.",
    });
  }
  return res.json({
    isError: false,
    message: "유저 인증 성공",
    data: getUserResult,
  });
});

const signupErrorCodeMessage = {
  1: "(!) 이미 가입된 이메일 입니다.",
  2: "(!) 서버 오류, 관리자에게 문의해주세요.",
};

const signupErrorCodeStatus = {
  1: 400,
  2: 500,
};

router.post("/signup", validateUserDataMiddleware, async (req, res) => {
  const { isError, code = null } = await insertUser(req.body);
  if (isError) {
    return res.status(signupErrorCodeStatus[code]).json({
      isError: true,
      message: signupErrorCodeMessage[code],
    });
  }
  return res.status(201).json({ isError: false, message: "회원가입 성공" });
});

router.post("/signin", validateUserDataMiddleware, async (req, res) => {
  const isExistUserResult = await isExistUser(req.body);
  if (!isExistUserResult) {
    return res
      .status(400)
      .json({ isError: true, message: "(!) 해당 유저가 없습니다." });
  }
  return res.status(200).json({
    isError: false,
    message: "로그인 성공",
    token: getToken(req.body),
  });
});

module.exports = router;
