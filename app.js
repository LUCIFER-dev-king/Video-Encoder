const express = require("express");
const app = express();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
var formidable = require("formidable");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const encodeVideo = require("ffmpeg-hls");

// encodeVideo();

// app.get("/", (req, res) => res.send("Video Encoding"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "\\index.html");
});

app.get("/download", (req, res) => {
  res.download(
    __dirname + "\\" + "b5f56320-a039-47c6-8c39-16f6a56b8598.key",
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
  form.uploadDir = "./video";
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    res.writeHead(200, { "content-type": "text/plain" });
    res.write("received upload:\n\n");
    console.log(files.video.path);
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
