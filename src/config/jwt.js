import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "5d",
  });
};

//define function để verify token
export const createRefToken = (data) => {
  return jwt.sign({ payload: data }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    return true;
  } catch (error) {
    false;
  }
};

//define middleware đẻ check token

export const middlewareToken = (req, res, next) => {
  let { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let checkToken = verifyToken(token);
  console.log("token", checkToken);
  if (checkToken) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
