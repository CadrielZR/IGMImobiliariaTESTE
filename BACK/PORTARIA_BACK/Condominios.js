const tabela = 'Condominios';
const db = require('./db');

async function login(username, password) {
   var params = [username, password];
   const Equipamentos = await db.SelectAllbyParams("sp_login_imobiliaria_app", params);
   return Equipamentos;
}

async function getCondominiosImobiliaria(id_imobiliaria){
   var params = [id_imobiliaria];
   const Equipamentos = await db.SelectAllbyParams("sp_get_condominios_imobiliaria", params);
   return Equipamentos;
}

module.exports = {login, getCondominiosImobiliaria}

