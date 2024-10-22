import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { Op } from "sequelize";
//tạo object model đại diện cho tất cả model của ORM

const model = initModels(sequelize);

const getVideos = async (req, res) => {
  try {
    let data = await model.video.findAll();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error for api get list api" });
  }
};

const getTypes = async (req, res) => {
  try {
    const data = await model.video_type.findAll();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error for api get type api" });
  }
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
    const data = await model.video.findOne({
      where: {
        video_id: videoID,
      },
      include: {
        model: model.users,
        as: "user",
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
