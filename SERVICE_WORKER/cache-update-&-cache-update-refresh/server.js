const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

var MAX_IMAGES = 50;
var imageNumber = 0;

var lastUpdate = 0;

function serveImage(res, timeout) {
  var now = Date.now();
  if (now - lastUpdate > timeout) {
    imageNumber = (imageNumber + 1) % MAX_IMAGES;
    lastUpdate = Date.now();
  }
  var imageName = "picture-" + (imageNumber + 1) + ".png";
  res.sendFile(imageName, { root: "./imgs/random/" });
}
app.use(cors());
app.get("/asset", function (req, res) {
  serveImage(res, 10000);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
