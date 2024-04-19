const tabela = 'Pessoas';
const db = require('./db');
async function getAllPessoas() {
   const Pessoas = await db.SelectALL(tabela);
   return Pessoas;
}
async function getOnePessoasById(id) {
   const Pessoas = await db.SelectOneByParam(tabela, 'id_escola', id);
   return Pessoas;
}
async function updatePessoas(idpessoa, id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim, status) {
   foto = foto.replaceAll("traco", "/").replaceAll("mais", "+");
   var params = [idpessoa, id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim, status];
   const Pessoas = await db.Update(tabela, params);
   return Pessoas;
}
async function insertPessoas(id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim, status) {
   foto = foto.replaceAll("traco", "/").replaceAll("mais", "+");
   var params = [id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim, status];
   const Pessoas = await db.Insert(tabela, params);
   return Pessoas;
}

async function insertDadosPessoas(id_pessoa, rg, telefoe_apartamento, data_nascimento, email, veiculo, cor, placa, obs1, obs2) {
   var params = [id_pessoa, rg, telefoe_apartamento, data_nascimento, email, veiculo, cor, placa, obs1, obs2];
   const Pessoas = await db.Insert('pessoas_dados', params);
   return Pessoas;
}

async function updateDadosPessoas(id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim, status) {
   var params = [id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim, status];
   const Pessoas = await db.Update('pessoas_dados', params);
   return Pessoas;
}

async function getAllComandosByPessoa(id) {
   const Equipamentos = await db.SelectAllbyParam("sp_consultar_comandos_por_pessoa", id);
   return Equipamentos;
}

async function getOnePessoa(id) {
   const Equipamentos = await db.SelectAllbyParam("sp_get_one_pessoa", id);
   return Equipamentos;
}

async function getGruposAtendente(placeholder) {
   const Equipamentos = await db.SelectAllbyParam("sp_get_grupos_atendimento",0);
   return Equipamentos;
}

async function getGruposMembros(id_atendente) {
   var params = [id_atendente]
   const Equipamentos = await db.SelectAllbyParams("sp_get_grupos_membros",params);
   return Equipamentos;
}

async function insertFuncionarioAtendente(id_pessoa,nome, email, senha, cpf, foto_atendente, id_acesso, status, setor, funcao,chamado){
   var params = [id_pessoa,nome, email, senha, cpf, foto_atendente, id_acesso, status, setor, funcao,chamado];
   const Equipamentos = await db.SelectAllbyParams("sp_insert_funcionario_atendente",params);
   return Equipamentos;
}

async function insertFuncionarioGrupoMembro(id_pessoa, id_grupo, id_administrador){
   var params = [id_pessoa, id_grupo, id_administrador]
   const Equipamentos = await db.SelectAllbyParams("sp_insert_funcionario_grupo_membro",params);
   return Equipamentos;
}

async function preEditarGrupoMembro(id_pessoa){
   var params = [id_pessoa]
   const Equipamentos = await db.SelectAllbyParams("sp_pre_editar_grupo_membro",params);
   return Equipamentos;
}


async function desativaFuncionarioAtendente(id_pessoa){
   var params = [id_pessoa]
   const Equipamentos = await db.SelectAllbyParams("sp_desativa_funcionario_atendente",params);
   return Equipamentos;
}

async function reativaFuncionarioAtendente(id_pessoa){
   var params = [id_pessoa]
   const Equipamentos = await db.SelectAllbyParams("sp_reativa_funcionario_atendente",params);
   return Equipamentos;
}

async function getMoradoresAp(condomonio, apartamento) {
   var params = [condomonio, apartamento];
   const Equipamentos = await db.SelectAllbyParams("sp_get_moradores_ap", params);
   return Equipamentos;
}


async function getMoradoresCondominio(id) {
   const Equipamentos = await db.SelectAllbyParam("sp_get_pessoas_condominio", id);
   return Equipamentos;
}



async function getMoradoresCondominioSemFuncionarios(id) {
   const Equipamentos = await db.SelectAllbyParam("sp_get_pessoas_condominio_moradores", id);
   return Equipamentos;
}

async function insertPessoa(id_pessoa, id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim,
   status, data_nascimento, obs1, obs2, veiculo, placa, cor, telefone, rg, apartamento, condominio,id_nivel) {
   var params = [id_pessoa, id_tipo_pessoa, nome, sobrenome, documento, cartao, senha, email, celular, celular2, foto, inicio, fim,
      status, data_nascimento, obs1, obs2, veiculo, placa, cor, telefone, rg, apartamento, condominio,id_nivel];

   const Equipamentos = await db.SelectAllbyParams("sp_insert_pessoa", params);
   return Equipamentos;
}

async function insertPessoaUnidade(id_pessoa, apartamento) {
   var params = [id_pessoa, apartamento];

   const Equipamentos = await db.SelectAllbyParams("sp_insert_pessoa_unidade", params);
   return Equipamentos;
}

async function getFiltroMoradores(id_condominio, nome, ap, documento, rg, nascimento) {
   var params = [id_condominio, nome, ap, documento, rg, nascimento];
   const Equipamentos = await db.SelectAllbyParams("sp_filtro_formulario", params);
   return Equipamentos;
}


async function deletarMorador(id_pessoa) {
   //var params =entrada;
   params = id_pessoa;
   const Equipamentos = await db.SelectAllbyParam("sp_deletar_pessoa", params);
   return Equipamentos;
}

async function getAutorizados(id_condominio, apartamento) {
   //var params =entrada;
   params = [id_condominio, apartamento];
   const Equipamentos = await db.SelectAllbyParams("sp_get_moradores_autorizados_ap", params);
   return Equipamentos;
}

async function getApartamentosCondominio(id_condominio) {
   //var params =entrada;
   params = id_condominio;
   const Equipamentos = await db.SelectAllbyParam("sp_buscar_apartamentos_condominio", params);
   return Equipamentos;
}



async function getPessoasApartamento(id_condominio, id_apartamento) {
   //var params =entrada;
   params = [id_condominio, id_apartamento];
   const Equipamentos = await db.SelectAllbyParams("sp_buscar_pessoas_aparamento", params);
   return Equipamentos;
}


async function getFotosZKCondominio(id_condominio) {
   //var params =entrada;
   params = id_condominio;
   const Equipamentos = await db.SelectAllbyParam("sp_get_fotoszk_condominio", id_condominio);
   return Equipamentos;
}

async function AtualizarFotoZkBANCO(id_pessoa, base64) {
   //var params =entrada;
   params = [id_pessoa, base64];
   const Equipamentos = await db.SelectAllbyParams("sp_atualizar_foto_pessoa_zk", params);
   return Equipamentos;
}



module.exports = { AtualizarFotoZkBANCO, getFotosZKCondominio,getPessoasApartamento, getApartamentosCondominio, getAutorizados, deletarMorador, getFiltroMoradores, getMoradoresCondominioSemFuncionarios, getMoradoresCondominio, getMoradoresAp, getOnePessoa, insertPessoa, updateDadosPessoas, insertDadosPessoas, getAllComandosByPessoa, getAllPessoas, getOnePessoasById, insertPessoas, insertPessoaUnidade, updatePessoas, getGruposAtendente, insertFuncionarioAtendente, insertFuncionarioGrupoMembro, desativaFuncionarioAtendente, reativaFuncionarioAtendente, preEditarGrupoMembro, getGruposMembros}
