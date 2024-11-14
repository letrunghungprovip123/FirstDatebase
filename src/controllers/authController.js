import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op, where } from "sequelize";
//tạo object model đại diện cho tất cả model của ORM
import bcrypt from "bcrypt";
import transporter from "../config/transporter.js";
import jwt from "jsonwebtoken";
import { createRefToken, createToken } from "../config/jwt.js";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
const model = initModels(sequelize);
const prisma = new PrismaClient();

const signUp = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;
    // let checkUser = await model.users.findOne({
    //   where: {
    //     email,
    //   },
    // });
    let checkUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (checkUser) {
      return res.status(400).json({ message: "Email is wrong" });
    }
    // await model.users.create({
    //   full_name,
    //   email,
    //   pass_word: bcrypt.hashSync(pass_word, 10),
    // });
    await prisma.users.create({
      data: {
        full_name,
        email,
        pass_word: bcrypt.hashSync(pass_word, 10),
      },
    });
    // Cấu hình email
    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to our service",
      html: `
            <h1>Welcome ${full_name} to our service</h1>

        `,
    };
    //gửi maill
    transporter.sendMail(mailOption, (err, infor) => {
      if (err) {
        return res.status(500).json({ message: "Send email fail" });
      }
      return res.status(201).json({ message: "Create user successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "error API sign-up" });
  }
};

const signIn = async (req, res) => {
  let { email, pass_word } = req.body;
  let checkUser = await model.users.findOne({
    where: {
      email,
    },
  });
  if (!checkUser) {
    return res.status(400).json({ message: "Email is wrong" });
  }
  let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
  // if (!checkPass) return res.status(400).json({ message: "Email is wrong" });

  let payload = {
    userId: checkUser.user_id,
  };
  let accessToken = createToken(payload);

  //tạo refresh token

  let refreshToken = createRefToken(payload);

  // lưu refreshToken vào table users
  await model.users.update(
    {
      refresh_token: refreshToken,
    },
    {
      where: {
        user_id: checkUser.user_id,
      },
    }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false, //dùng riêng cho localhost
    sameSite: "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // thời gian tồn tại là 7 ngày
  });
  return res
    .status(200)
    .json({ message: "Login successfully", token: accessToken });
};

const loginFacebook = async (req, res) => {
  try {
    let { id, email, name } = req.body;
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });
    //nếu email này không tồn tại trong db tiến hành tạo user mới,send mail return access token
    if (!checkUser) {
      let newUser = await model.users.create({
        full_name: name,
        email,
        face_app_id: id,
      });
      const mailOption = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to our service",
        html: `
            <h1>Welcome ${name} to our service</h1>

        `,
      };
      //gửi maill

      return transporter.sendMail(mailOption, (err, infor) => {
        if (err) {
          return res.status(500).json({ message: "Send email fail" });
        }
        let payload = {
          userId: newUser.user_id,
        };
        let accessToken = createToken(payload);
        return res
          .status(201)
          .json({ message: "Login successfully", token: accessToken });
      });
    }
    let payload = {
      userId: checkUser.user_id,
    };
    let accessToken = createToken(payload);
    return res
      .status(200)
      .json({ message: "Login successfully", token: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error API login facebook" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    let { email } = req.body;
    //kiểm tra email có tồn tại trong db hay không
    let checkUser = await model.users.findOne({
      where: {
        email,
      },
    });
    if (!checkUser) {
      return res.status(400).json({ message: "Email is wrong" });
    }
    let randomCode = crypto.randomBytes(6).toString("hex");
    // tạo biến để lưu expire code

    let expired = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);

    await model.code.create({
      code: randomCode,
      expired,
    });
    //send mail gửi code mới

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Xác thực",
      html: `
            <h1>${randomCode}</h1>

        `,
    };
    //gửi maill
    return transporter.sendMail(mailOption, (err, infor) => {
      if (err) {
        return res.status(500).json({ message: "Send email fail" });
      }
      return res.status(201).json({ message: "send forgot mail successfull" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error API forgot password" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, code, newPass } = req.body;
    //check email có tồn tại trong db hay không
    let checkEmail = await model.users.findOne({
      where: {
        email,
      },
    });
    if (!checkEmail) return res.status(400).json({ message: "Email is wrong" });
    if (!code) return res.status(400).json({ message: "code is wrong" });

    let checkCode = await model.code.findOne({
      where: { code },
    });
    if (!checkCode) return res.status(400).json({ message: "code is wrong" });

    let hashNewPass = bcrypt.hashSync(newPass, 10);

    //c1:
    checkEmail.pass_word = hashNewPass;
    checkEmail.save();

    //huỷ code sau khi change password
    await model.code.destroy({
      where: { code },
    });
    return res.status(200).json({ message: "change password successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error API change password" });
  }
};

const extendToken = async (req, res) => {
  try {
    // lấy refresh token từ cookie của req
    let refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "401" });
    }

    // check refresh token trong db
    let userRefToken = await model.users.findOne({
      where: { refresh_token: refreshToken },
    });

    if (!userRefToken || userRefToken == null) {
      return res.status(401).json({ message: "401" });
    }

    //  create new access token
    let newAccessToken = createToken({ userId: userRefToken.user_id });
    return res.status(200).json({ message: "Success", token: newAccessToken });
  } catch (error) {
    return res.status(500).json({ message: "Error API extend token" });
  }
};
export {
  signUp,
  signIn,
  loginFacebook,
  forgotPassword,
  changePassword,
  extendToken,
};
