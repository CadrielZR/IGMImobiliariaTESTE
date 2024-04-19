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
var request = require('request');

var IP = '191.252.178.158';
var PORT = '3558';
const db = require('./db');
const { match } = require("assert");

async function getAllCamerasCondominio(id) {
  const Condominios = await db.SelectAllbyParam('sp_get_cameras_condominio', id);
  return Condominios;
}

app.listen(PORT, IP, function (err) {
  if (err) console.log(err);
  console.log('Servidor ativo no IP: ' + IP + ', e porta: ', PORT);
});

var cameras_global = [];
app.get("/initCamerasCondominio", async (req, res) => {
  var id_condominio = req.query.id_condominio;
  try {
    var data = await getAllCamerasCondominio(id_condominio);
    data = data[0];
    cameras_global = data;
    console.log(data);
    if (cameras_global.length > 0) {
      percorrer(0);
    }
  }
  catch (ex) {
    //  console.log(ex);
  }
  res.send("inciiado");
});

async function percorrer(atual) {
  if (atual < cameras_global.length) {
    var options = {
      name: cameras_global[atual].descricao,
      url: cameras_global[atual].rstp,
      wsPort: cameras_global[atual].porta,
      port: Math.round(cameras_global[atual].porta / 2 + atual)
    };

    console.log('https://www.igmportariaremota.com.br:' + Math.round(cameras_global[atual].porta / 2 + atual));

    await request('https://www.igmportariaremota.com.br:' + Math.round(cameras_global[atual].porta / 2 + atual), function (error, response, body) {

      if (!error) {
        console.log("já existe");
        // console.log(body) // Mostra o HTML da página inicial do StackOverflow.
      }
      else {
        console.log("NÃO existe");
        if (error.errno == -111) {
          intServer(options, atual);
        }

      }
    });

    //  intServer(options, atual);

  }
  else {
    console.log('finalizou');
  }
}

async function intServer(options, atual) {
  // console.log(options);
  try {
    var stream = await new Stream(options);
    await stream.start();
    percorrer(atual + 1);
    return 1;
  }
  catch (ex) {
    //  console.log(ex);
    return 2;
  }
}


app.get("/getStream", (req, res) => {
  var porta = req.query.porta;
  var rtsp = req.query.rtsp;
  const options = {
    name: "streamName",
    url: 'rtsp://admin:igm12345@cc210cc1c1db.sn.mynetname.net:5551/Streaming/Channels/' + rtsp + '',
    wsPort: porta
  };
  const stream = new Stream(options);
  stream.start();
  res.send(options);
});
