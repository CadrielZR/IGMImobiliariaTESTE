const tabela = 'Nivel_equipamento_pessoass';
async function getAllNivel_equipamento_pessoass() {
   const db = require('./db');
   const Nivel_equipamento_pessoass = await db.SelectALL(tabela);
   return Nivel_equipamento_pessoass;
}

async function DeleteAllConfiguracoesNivelPessoa(id_pessoa) {
   const db = require('./db');
   const Nivel_equipamento_pessoass = await db.SelectAllbyParam('sp_deletar_todos_configuracoes_pessoa',id_pessoa);
   return Nivel_equipamento_pessoass;
}

async function getOneNivel_equipamento_pessoassById(id) {
   const db = require('./db');
   const Nivel_equipamento_pessoass = await db.SelectOneByParam(tabela, 'idnivel_equipamento_pessoas', id);
   return Nivel_equipamento_pessoass;
}
async function updateNivel_equipamento_pessoass(idnivel_equipamento_pessoas,id_portaria,idpessoa, id_nivel) {
   var params = [idnivel_equipamento_pessoas, id_portaria,idpessoa, id_nivel];
   const db = require('./db');
   const Nivel_equipamento_pessoass = await db.Update(tabela, params);
   return Nivel_equipamento_pessoass;
}
async function insertNivel_equipamento_pessoass(id_portaria,idpessoa, id_nivel) {
   var params = [id_portaria,idpessoa, id_nivel];
   const db = require('./db');
   const Nivel_equipamento_pessoass = await db.Insert(tabela, params);
   return Nivel_equipamento_pessoass;
}
module.exports = { DeleteAllConfiguracoesNivelPessoa,getAllNivel_equipamento_pessoass, getOneNivel_equipamento_pessoassById, insertNivel_equipamento_pessoass, updateNivel_equipamento_pessoass }
