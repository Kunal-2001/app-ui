const express = require("express");
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Mock Server Running at http://localhost:${port}`);
});
