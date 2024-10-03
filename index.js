import express from "express";
import connect from "./ds.js";
// Tạo object tổng của express
const app = express();

//thêm middleware để convert string về json với API POST và PUT

app.use(express.json());

// viết API hello world
app.get("/hello-world", (req, res) => {
  res.send("Hello world");
});

app.get("/hungpro123", (req, res) => {
  res.send("hungpro123");
});

app.get("/get-user/:id/:hoTen", (req, res) => {
  let { id, hoTen } = req.params;
  let { queryString } = req.query;
  let { token } = req.headers;
  res.send({ id, hoTen, queryString, token });
});

app.get("/get-user-db", async (req, res) => {
  const [data] = await connect.query(`SELECT * from restaurant`);
  res.send(data);
});
//lấy body từ api post và put

app.post("/create-user-db", async (req, res) => {
  const query = `INSERT INTO users(full_name,email,pass_word) VALUES
    (?,?,?)
    `;
  let body = req.body;
  let { full_name, email, pass_word } = body;
  const [data] = await connect.execute(query, [full_name, email, pass_word]);
  return res.send(data);
});

app.post("/create-user", (req, res) => {
  let body = req.body;
  res.send(body);
});

// define port cho backend
app.listen(8080, () => {
  console.log("BE starting with port 8080");
});
