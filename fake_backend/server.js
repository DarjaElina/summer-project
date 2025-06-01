const path = require("path");
const jsonServer = require("json-server");
const server = jsonServer.create();

const router = jsonServer.router(path.join(__dirname, "db.json"));

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);



server.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  const users = router.db.get("users").value();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({
      user_id: user.id,
      username: user.username,
      token: "12345678",
    });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running at http://localhost:3001");
});

