const jwt = require("jsonwebtoken");

const JWT_SECRET = "humanwater-secret";
const generateToken = ({ email }) => {
  const payload = {
    email,
  };
  return jwt.sign(payload, JWT_SECRET, { algorithm: "HS256", expiresIn: "1h" });
};

const validateToken = (token) => {
  if (!token || !token.trim().length) return false;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      email: decoded.email,
    };
  } catch (err) {
    console.log({ err });
    return false;
  }
};

const getToken = (data) => {
  return generateToken({ email: data.email });
};

module.exports = { getToken, validateToken };
