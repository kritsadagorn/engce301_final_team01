const { apiConfig } = require("../config");
const jwt = require("jsonwebtoken");

function getMiddlewareToken(h) {
  const token = h.headers["x-auth-token"];
  if (!token) return null;
  try {
    const parsed = jwt.verify(token, apiConfig.jwtKey, {
      algorithms: ["HS256"],
    });
    return parsed.agent_code;
  } catch (e) {
    return null;
  }
}

module.exports = {
  getMiddlewareToken,
};