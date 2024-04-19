/*Stream = require('node-rtsp-stream')
stream = new Stream({
  name: 'name',
  streamUrl: 'rtsp://admin:igm12345@cc210cc1c1db.sn.mynetname.net:5551/Streaming/Channels/502',
  wsPort: 9999,
  ffmpegOptions: { // options ffmpeg flags
    '-stats': '', // an option with no neccessary value uses a blank string
    '-r': 30 // options with required values specify the value after the key
  }
})
*/
var http = require("http");
var express = require("express");
var app = express();
var ffmpeg = require("ffmpeg");
const Stream = require("node-rtsp-stream-jsmpeg");

const options = {
  name: "streamName",
  url:  'rtsp://admin:igm12345@cc210cc1c1db.sn.mynetname.net:5551/Streaming/Channels/502',
  wsPort: 3333
};

const stream = new Stream(options);
stream.start();

/*
http.Server(app).listen(5000, () => console.log("server start on port 5000"));

app.get("/", (req, res) => {
  res.send("hal");
});
app.get("/a", (req, res) => {
  res.send("a");
});
*/