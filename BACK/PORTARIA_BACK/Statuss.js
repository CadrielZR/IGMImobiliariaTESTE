const tabela = 'Statuss';

async function getAllStatuss()

{

   const db = require('./db');

   const Statuss = await db.SelectALL(tabela);

   return Statuss;

}

async function getOneStatussById(id)

{

   const db = require('./db');

   const Statuss = await db.SelectOneByParam(tabela,'id_escola',id);

   return Statuss;

}

async function updateStatuss(idstatus,nome,descricao)

{

    var params = [idstatus,nome,descricao];

   const db = require('./db');

   const Statuss  = await db.Update(tabela,params);

   return Statuss ;

}

async function insertStatuss(nome,descricao)

{

    var params = [nome,descricao];

   const db = require('./db');

   const Statuss  = await db.Insert(tabela,params);

   return Statuss ;

}

module.exports = {getAllStatuss,getOneStatussById,insertStatuss,updateStatuss}

