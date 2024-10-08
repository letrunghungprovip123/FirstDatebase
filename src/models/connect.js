import { Sequelize } from "sequelize";

// tạo object sequelize để connect tới database

const sequelize = new Sequelize(
  "node47_youtube", // tên database
  "root", // tên username
  "123456",
  {
    host: "localhost",
    port: 3307,
    dialect: "mysql",
  }
);

export default sequelize;