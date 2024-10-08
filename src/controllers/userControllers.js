import connect from "../../ds.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
//tạo object model đại diện cho tất cả model của ORM

const model = initModels(sequelize);
const getUsers = (req, res) => {
  res.status(200).json({ message: "get-users" });
};

const createUser = (req, res) => {
  let body = req.body;
  res.send(body);
};

const getUserDB = async (req, res) => {
  const [data] = await connect.query(`SELECT * from users`);
  res.send(data);
};

const getUserOrm = async (req, res) => {
  try {
    let data = await model.users.findAll({
      where: {
        full_name: {
          [Op.like]: `%John%`,
        },
      },
      attributes: ["full_name", "user_id", "email"],
      include: [
        {
          model: model.video,
          as: "videos",
          required: true,
        },
      ],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ message: "error from ORM" });
  }
};

const getUserOrmById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await model.users.findOne({
      where: {
        user_id: id,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "error API get user by id" });
  }
};
const createUserOrm = async (req, res) => {
  try {
    let { full_name, email } = req.body;
    await model.users.create({
      full_name,
      email,
    });
    return res.status(201).json({ message: "Create user successfully" });
  } catch (error) {
    return res.status(500).json({ message: "error API create user orm" });
  }
};
export {
  getUsers,
  createUser,
  getUserDB,
  getUserOrm,
  getUserOrmById,
  createUserOrm,
};
