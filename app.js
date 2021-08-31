const express = require("express");
const app = express();
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// const encodeVideo = require("ffmpeg-hls");

// encodeVideo();

// app.get("/", (req, res) => res.send("Video Encoding"));

// app.get("/download", (req, res) => {
//   res.download(
//     __dirname + "\\" + "b5f56320-a039-47c6-8c39-16f6a56b8598.key",
//     (err) => {
//       if (err) console.log(err);
//     }
//   );
// });

// app.listen(8080, () => {
//   console.log("server is running");
// });

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
