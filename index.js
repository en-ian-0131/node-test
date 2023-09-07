if (process.argv[2] && process.argv[2] === "start") {
  require("dotenv").config({
    path: "./production.env",
  });
} else {
  require("dotenv").config({
    path: "./dev.env",
  });
}

const express = require("express");
const cors = require("cors");
const server = express();
const db = require("./module/db_connection");
const bcrypt = require("bcryptjs");

//根目錄要用express.static()
server.use(express.static("public"));
server.use(express.static("node_modules/bootstrap/dist"));
server.use(cors());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.send("你好~");
  //   res.render("main", { name: "Ian" });
});

server.get("/try_db", async (req, res) => {
  const [response] = await db.query("SELECT * FROM admins LIMIT 1");
  res.json(response);
});

server.post("/login", async (req, res) => {
  const output = {
    success: true,
    code_status: 200,
    error: 0,
    body: req.body,
    message: "",
  };

  const sql = "SELECT * FROM admins WHERE account=?";
  const [row] = await db.query(sql, [req.body.account]);

  if (!row.length) {
    output.success = false;
    output.code_status = 401;
    output.error = 1;
    output.message = "status:401 帳號錯誤!!!";
    return res.json(output);
  } else {
    output.message = "status:402 帳號對了!!!";
    if (!(await bcrypt.compare(req.body.password, row[0].password_hash))) {
      output.success = false;
      output.code_status = 402;
      output.error = 1;
      output.message = "status:402 帳號對了密碼錯誤";

    } else {
      output.success = true;
      output.code_status = 200;
      output.error = 0;
      output.message = "status:200 帳號密碼都正確";
      output.admin = {
        account: row[0].account,
        nickname: row[0].nickname,
      };
    }
  }
  res.json(output);
});

server.use((req, res) => {
  res
    .status(404)
    .send(`<h1>找不到頁面</h1><p>404</p><img src="/imgs/12345.jpeg"/>`);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`伺服器正常啟動:${port}`);
});
