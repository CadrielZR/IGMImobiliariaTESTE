const tabela = 'Nivelacessos';
const db = require('./db');
async function getAllNivelacessos() {
   const Nivelacessos = await db.SelectALL(tabela);
   return Nivelacessos;
}

async function getAllNivelacessosByCondominio(id_condominio) {

   const Nivelacessos = await db.SelectAllbyParam('sp_consultar_niveis_by_condominio', id_condominio);
   return Nivelacessos;
}

async function getOneNivelacessosById(id) {

   const Nivelacessos = await db.SelectOneByParam(tabela, 'id_nivelAcesso', id);
   return Nivelacessos;
}
async function updateNivelacessos(id_nivelAcesso, id_condominio, id_timezone, nome, descricao) {
   var params = [id_nivelAcesso, id_condominio, id_timezone, nome, descricao];

   const Nivelacessos = await db.Update(tabela, params);
   return Nivelacessos;
}
async function insertNivelacessos(id_condominio, id_timezone, nome, descricao) {
   var params = [id_condominio, id_timezone, nome, descricao];

   const Nivelacessos = await db.Insert(tabela, params);
   return Nivelacessos;
}

async function getNiveisAcessoPessoa(id_pessoa, id_config_nivel) {
   var params = [id_pessoa, id_config_nivel];
   const Nivelacessos = await db.SelectAllbyParams('sp_get_niveis_acesso_pessoa',params);
   return Nivelacessos;
}

async function insertNivelPessoa(id_portaria,id_pessoa, id_nivel) {
   var params = [id_portaria,id_pessoa, id_nivel];
   const Nivelacessos = await db.SelectAllbyParams('sp_insert_nivel_pessoa',params);
   return Nivelacessos;
}
module.exports = {insertNivelPessoa,getNiveisAcessoPessoa, getAllNivelacessosByCondominio, getAllNivelacessos, getOneNivelacessosById, insertNivelacessos, updateNivelacessos }
