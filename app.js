const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Video Encoding"));

app.listen(8080, () => {
  console.log("server is running");
});
