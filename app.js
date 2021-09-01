const express = require("express");
const app = express();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
var formidable = require("formidable");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const encodeVideo = require("ffmpeg-hls");

// app.get("/", (req, res) => res.send("Video Encoding"));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "\\index.html");
});

app.get("/download", (req, res) => {
  res.download(
    __dirname +
      "\\encryptedVideos\\3d4bb0f5-4715-42d0-a590-546dc550882d\\3d4bb0f5-4715-42d0-a590-546dc550882d.key",
    (err) => {
      if (err) console.log(err);
    }
  );
});

app.listen(8080, () => {
  console.log("server is running");
});

app.post("/upload", (req, res) => {
  var form = new formidable.IncomingForm();
  var id = uuidv4();
  if (!fs.existsSync("encryptedVideos")) {
    fs.mkdirSync("encryptedVideos");
    fs.mkdirSync(`encryptedVideos/${id}`);
  } else {
    fs.mkdirSync(`encryptedVideos/${id}`);
  }

  form.uploadDir = `./encryptedVideos/${id}`;

  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.write("received upload:\n\n");
    // console.log(files.video.path.slice(53));
    encodeVideo(
      id,
      files.video.path.slice(53),
      "http://localhost:8080/download"
    );

    // var stream = fs.createWriteStream(__dirname + "/video", +files.video.path);
  });
});

// const keyId = uuidv4();

// const startEncryption = () => {};

// exec(
//   `openssl rand 16 > ${keyId}.key && echo uri > ${keyId}.keyinfo && echo ${keyId}.key >> ${keyId}.keyinfo && ffmpeg -y -i test.mp4 -hls_time 9 -hls_key_info_file ${keyId}.keyinfo -hls_playlist_type vod -hls_segment_filename "fileSequence%d.ts" prog_index.m3u8`,
//   (error, stdout, stderr) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log("key created");
//     }
//   }
// );

// ffmpeg -y -i test.mp4 -hls_time 9 -hls_key_info_file ${keyId}.keyinfo -hls_playlist_type vod -hls_segment_filename "fileSequence%d.ts" prog_index.m3u8
