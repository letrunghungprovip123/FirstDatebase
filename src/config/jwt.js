import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const createToken = (data) => {
  return jwt.sign({ payload: data }, process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: "30m",
  });
};

//define function để verify token

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
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let checkToken = verifyToken(token);
  if (checkToken) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
