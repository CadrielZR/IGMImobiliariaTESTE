var express = require('express');
var axios = require('axios');
axios.defaults.timeout = 600000; // 10 minutos em milissegundos

const http = require('http');
var app = express();
var PORT = 3001;
const WS_PORT = 3002;
var IP = '0.0.0.0';
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bigInt = require("big-integer");
const sharp = require('sharp');
const bodyParser = require('body-parser');
const FormData = require('form-data');
const tough = require('tough-cookie');
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' })); // Aumente o limite conforme necessário

// Configuração do CORS
const allowedOrigins = [
  '*'
];

app.use(express.json({ limit: '300mb' }));
app.use(
  cors("*")
);
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
// Servir arquivos estáticos
app.use('/atendimento', express.static(path.join(__dirname, 'atendimento')));
app.use('/images', express.static(path.join(__dirname, 'imagens')));
app.use('/pessoas', express.static(path.join(__dirname, 'pessoas')));
app.use('/ambientes', express.static(path.join(__dirname, 'ambientes')));
app.use('/eventos', express.static(path.join(__dirname, 'eventos')));
app.use('/emergencias', express.static(path.join(__dirname, 'emergencias')));
app.use('/models', express.static(path.join(__dirname, 'models')));
app.use('/public', express.static(path.join(__dirname, 'public')));
// Iniciando Servidor HTTP:
const server = http.createServer(app);
const WebSocket = require('ws');

server.listen(PORT, IP, function (err) {
  if (err) console.log(err);
  console.log('Servidor HTTP ativo no IP: ' + IP + ', e porta: ', PORT);
});

// Configuração do WebSocket
const wss = new WebSocket.Server({
  server,
  perMessageDeflate: false,
  clientTracking: true,
  // Defina um tempo limite maior aqui, por exemplo:
  verifyClient: function (info, callback) {
    info.req.socket.setTimeout(600000);
    callback(true);
  }
});
console.log('WebSocket Server criado');

// Array para armazenar as conexões WebSocket ativas
const connections = [];

// Evento que é disparado quando um cliente se conecta ao WebSocket
wss.on('connection', (connection, upgradeReq) => {
  const urlParams = new URLSearchParams(upgradeReq.url.split('?')[1]);
  const id_remetente = urlParams.get('id_remetente');
  const id_destinatario = urlParams.get('id_destinatario');

  console.log('Cliente conectado com ID:', id_remetente);
  console.log('id_destinatario', id_destinatario);

  // Adiciona a conexão à lista de conexões ativas
  connections.push(connection);

  // Evento que é disparado quando uma mensagem é recebida do cliente
  connection.on('message', (message) => {
    if (message instanceof Buffer) {
      // Se a mensagem for binária, convertemos para texto (UTF-8)
      const msg = message.toString('utf8');
      console.log('Mensagem recebida:', msg);

      // Verificar se o cliente é o remetente ou destinatário da mensagem
      const msgObj = JSON.parse(msg);
      const isRemetente = msgObj.remetente === id_remetente;
      const isDestinatario = msgObj.destinatario === id_destinatario;

      // Enviar a mensagem recebida para todas as outras conexões ativas
      connections.forEach((conn) => {
        if (conn !== connection && conn.readyState === WebSocket.OPEN) {
          conn.send(msg);

          // Enviar notificação apenas para o cliente que é remetente ou destinatário da mensagem
          if (isDestinatario) {
            conn.send('Você recebeu uma nova mensagem!'); // Ou qualquer outra lógica de notificação que você desejar
          }
        }
      });
    }
  });
  // Evento que é disparado quando a conexão é fechada
  connection.on('close', (reasonCode, description) => {
    console.log('Cliente desconectado', connection.clientId);
    // Remove a conexão da lista de conexões ativas
    connections.splice(connections.indexOf(connection), 1);
  });
});

const db = require('./db');
const aplicativo = require("./app.js");
//Todas as depencias que o projeto vai consumir
const Condominios = require('./Condominios');
//Todas as depencias que o projeto vai consumir
const Equipamentos = require('./Equipamentos');
//Todas as depencias que o projeto vai consumir
const Pessoas = require('./Pessoas');
//Todas as depencias que o projeto vai consumir
const pull = require('./pull');
const relatorio_ss3530 = require('./relatorio_ss3530');

const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'smtplw.com.br',
  port: 587, // A porta SMTP padrão da Locaweb é 587
  secure: false, // Use 'true' se a Locaweb exigir conexão segura (SSL/TLS)
  auth: {
    user: 'ped@igmtecnologia.com.br',
    pass: 'igmTecnologia@2022',
  },
});
const crypto = require('crypto');
// Função para gerar um token seguro
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}




app.get('/', (req, res) => {
  res.send("Hello from express server.")
});


app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', (req, res) => {
  const { id_imobiliaria, nome, cpf, username, password } = req.body;
  const query = `INSERT INTO imobiliaria_user (id_imobiliaria , nome , cpf , login, senha) VALUES ('${id_imobiliaria}', '${nome}', '${cpf}', '${username}', '${password}')`;
  db.query(query, (err, results) => {
      if (err) {
          throw err;
      }
      // Sign-up successful, redirect to login page
      res.redirect('/login');
  });
});


app.get('/getIdImobiliaria', (req, res) => {
  console.log(2)
  const userId = userId_global
  console.log(userId)
  if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
  }
  const query = `SELECT * FROM imobiliaria WHERE id = ${userId}`;
  db.query(query, (err, results) => {
      id_imobiliaria_global = results[0]
      console.log(id_imobiliaria_global)
      gerar_condominios()
      if (err) {
          throw err;
      }

      res.json(results);
  });
});

app.post('/getCondominiosImobiliaria', async (req, res) => {
  const id_imobiliaria = req.body.id_imobiliaria
  return res.send(await Condominios.getCondominiosImobiliaria(id_imobiliaria));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/loginApp/', async (req, res) => {
  const username = req.body.user
  const password = req.body.senha;
  //const query = `SELECT * FROM imobiliaria_user WHERE login = '${username}' AND senha = '${password}'`;
  return res.send(await Condominios.login(username, password));
  //console.log(username)
});

app.get('/options/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'condominios.html'));
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
