const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/api/state/cache", (req, res) => {
  console.log(req.body);
  res.status(204);
});

app.listen(port, () => {
  console.log(`Mock Server Running at http://localhost:${port}`);
});
