
const db = require('./db');
async function TestConnect(host, user, password, database, port) {
   const Condominios = await db.TestConnect(host, user, password, database, port);
   return Condominios;
}


async function ExecutQuery(sql) {
   const db = require('./db');
   const Impressao_digitals = await db.ExecutQuery(sql);
   return Impressao_digitals;
}

async function ExecutQuerys(sql) {
   const db = require('./db');
   const Impressao_digitals = await db.ExecutQuerys(sql);
   return Impressao_digitals;
}



async function executProc(procedure, params) {
   params =[params];
   //const aluno = await db.SelectAllbyParamsAntiga(procedure, params);
   const aluno = await db.SelectAllbyParams(procedure, params);
   
   return aluno;
}


module.exports = {ExecutQuerys, TestConnect, ExecutQuery, executProc }


