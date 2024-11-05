import { expect } from "chai";
import Sinon from "sinon";
import initModels from "../../models/init-models.js";
import sequelize from "../../models/connect.js";
import { getTypes, getVideos } from "../../controllers/videoControllers.js";
import { describe } from "mocha";

const model = initModels(sequelize);

//define bộ test case cho function getVideo
// test case 1: getVideo thành công
// test case 2: getVideo thất bại

describe("getVideo", () => {
  let req, res, findAllStub;
  //thiết lập môi trường cho testing
  beforeEach(() => {
    req = {};
    res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub(),
    };
    // giả lập fuction finAll của ORM => Sinon
    findAllStub = Sinon.stub(model.video, "findAll");
  });
  afterEach(() => {
    //khôi phục lại stub
    findAllStub.restore();
  });
  // define từng test case cụ thể
  // case 1 : getVideo success
  it("getVideos successfully", async () => {
    const mockVideos = [
      {
        video_id: 1,
        video_name: "Introduction to Coding",
        thumbnail: "deadpool.jpg",
        description: "Learn the basics of coding",
        views: 1500,
        source: "youtube.com",
        user_id: 1,
        type_id: 2,
      },
      {
        video_id: 2,
        video_name: "Music Concert Highlights",
        thumbnail: "deadpool.jpg",
        description: "Highlights from a live music concert",
        views: 800,
        source: "vimeo.com",
        user_id: 2,
        type_id: 3,
      },
      {
        video_id: 3,
        video_name: "Gaming Adventure Episode 1",
        thumbnail: "deadpool.jpg",
        description: "First episode of a gaming adventure",
        views: 2500,
        source: "twitch.tv",
        user_id: 3,
        type_id: 5,
      },
      {
        video_id: 4,
        video_name: "Fashion Trends for Spring",
        thumbnail: "deadpool.jpg",
        description: "Latest fashion trends for the spring season",
        views: 1200,
        source: "instagram.com",
        user_id: 4,
        type_id: 7,
      },
      {
        video_id: 5,
        video_name: "Introduction to Cryptocurrency",
        thumbnail: "deadpool.jpg",
        description: "Understanding the basics of cryptocurrency",
        views: 300,
        source: "youtube.com",
        user_id: 5,
        type_id: 9,
      },
      {
        video_id: 6,
        video_name: "Full Stack Web Development Tutorial",
        thumbnail:
          "http://res.cloudinary.com/dghvdbogx/image/upload/v1722343917/node43/qos3uy7t4tbdp5vknys0.jpg",
        description: "Complete guide to full stack web development",
        views: 1200,
        source: "youtube.com",
        user_id: 1,
        type_id: 2,
      },
      {
        video_id: 7,
        video_name: "Acoustic Guitar Performance",
        thumbnail: "",
        description: "Soulful acoustic guitar performance",
        views: 650,
        source: "vimeo.com",
        user_id: 2,
        type_id: 3,
      },
      {
        video_id: 8,
        video_name: "Epic Gaming Moments Compilation",
        thumbnail: "gaming_compilation.jpg",
        description: "Compilation of epic gaming moments",
        views: 3500,
        source: "twitch.tv",
        user_id: 3,
        type_id: 5,
      },
      {
        video_id: 9,
        video_name: "Fitness Workout Routine",
        thumbnail: "fitness_workout.jpg",
        description: "Effective fitness workout routine",
        views: 900,
        source: "instagram.com",
        user_id: 4,
        type_id: 8,
      },
      {
        video_id: 10,
        video_name: "Understanding Blockchain",
        thumbnail: "blockchain_technology.jpg",
        description: "Exploring the concepts of blockchain",
        views: 500,
        source: "https://www.youtube.com/watch?v=CzXWhBjtRnU",
        user_id: 5,
        type_id: 9,
      },
    ];
    findAllStub.resolves(mockVideos);
    await getVideos(req, res);

    //mong đợi status code là 200
    expect(res.status.calledOnceWith(200)).to.be.true;
  });

  it("getVideos fail", async () => {
    findAllStub.rejects(new Error("Database error"));
    await getVideos(req, res);

    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({ message: "error for api get list api" }))
      .to.be.true;
  });
});


