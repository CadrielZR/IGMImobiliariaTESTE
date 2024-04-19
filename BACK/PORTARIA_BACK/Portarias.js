const tabela = 'Portarias';
const db = require('./db');
async function getAllPortarias() {
   const Portarias = await db.SelectALL(tabela);
   return Portarias;
}

async function getAllPortariasByCondominio(id_condominio) {
   const Portarias = await db.SelectAllbyParam('sp_consultar_portaria_by_id_condominio', id_condominio);
   return Portarias;
}

async function GetAllConfigNiveisByPortaria(id_portaria) {
   const Portarias = await db.SelectAllbyParam('sp_consultar_configuracao_nivel_portaria', id_portaria);
   return Portarias;
}

async function GetAllConfigNiveisByCondominio(id_condominio) {
   const Portarias = await db.SelectAllbyParam('sp_consultar_configuracao_nivel_condominio', id_condominio);
   return Portarias;
}

async function getOnePortariasById(id) {
   const Portarias = await db.SelectOneByParam(tabela, 'id_portaria', id);
   return Portarias;
}
async function updatePortarias(id_portaria, id_equipamento, id_rele, id_condominio, nome, descricao, latitude, longitude) {
   var params = [id_portaria, id_equipamento, id_rele, id_condominio, nome, descricao, latitude, longitude];
   const Portarias = await db.Update(tabela, params);
   return Portarias;
}
async function insertPortarias(id_equipamento, id_rele, id_condominio, nome, descricao, latitude, longitude) {
   var params = [id_equipamento, id_rele, id_condominio, nome, descricao, latitude, longitude];
   const Portarias = await db.Insert(tabela, params);
   return Portarias;
}

async function insertPortarias(id_equipamento, id_rele, id_condominio, nome, descricao, latitude, longitude) {
   var params = [id_equipamento, id_rele, id_condominio, nome, descricao, latitude, longitude];
   const Portarias = await db.Insert(tabela, params);
   return Portarias;
}


async function insertPortaria(id_portaria, id_equipamento, id_rele, id_condominio, nome, descricao) {
   var params = [id_portaria, id_equipamento, id_rele, id_condominio, nome, descricao];
   const Portarias = await db.SelectAllbyParams('sp_insert_portaria', params);
   return Portarias;
}

async function getOnePortaria(id) {
   const Portarias = await db.SelectAllbyParam('sp_get_one_portaria', id);
   return Portarias;
}




module.exports = {getOnePortaria,insertPortaria,GetAllConfigNiveisByPortaria, GetAllConfigNiveisByCondominio, getAllPortarias, getOnePortariasById, insertPortarias, updatePortarias, getAllPortariasByCondominio }
