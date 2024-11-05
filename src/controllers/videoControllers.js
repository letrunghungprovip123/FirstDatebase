import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
//tạo object model đại diện cho tất cả model của ORM
import { PrismaClient } from "@prisma/client";

const model = initModels(sequelize);
const prisma = new PrismaClient();

const getVideos = async (req, res) => {
  // let data = await model.video.findAll();
  let data = await prisma.video.findMany();
  return res.status(200).json(data);
};

const getTypes = async (req, res) => {
  const data = await prisma.video_type.findMany({
    where: {
      type_id: 1,
    },
    select: {
      type_name: true,
    },
  });
  return res.status(200).json(data);
};

const getTypesID = async (req, res) => {
  try {
    let { id } = req.params;
    const data = await model.video.findAll({
      where: {
        type_id: id,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error for api get id type api" });
  }
};

const getVideoById = async (req, res) => {
  try {
    let { videoID } = req.params;
    const data = await prisma.video.findFirst({
      where: {
        video_id: +videoID,
      },
      include: {
        users: {
          select: {
            user_id: true,
            full_name: true,
            email: true,
          },
        },
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "error for api get video by id api" });
  }
};

export { getVideos, getTypes, getTypesID, getVideoById };
