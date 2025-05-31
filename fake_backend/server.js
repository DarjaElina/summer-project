const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "john_dev" && password === "pass1234") {
    res.status(200).json({
      user_id: 1,
      username: "john_dev",
      token: "12345678"
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
});
