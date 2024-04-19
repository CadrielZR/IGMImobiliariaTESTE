const tabela = 'Equipamentos';
const db = require('./db');

async function getModelosEquipamento(id) {
   const Condominios = await db.SelectAllbyParam('sp_get_modelo_equipamentos',id);
   return Condominios;
}

async function insertEquipamento(id_equipamento,nome,descricao,modelo,serial,ip,gatway,mascara,conexao) {
   var params = [id_equipamento,nome,descricao,modelo,serial,ip,gatway,mascara,conexao];
   const Condominios = await db.SelectAllbyParams('sp_insert_equipamento',params);
   return Condominios;
}


async function getAllEquipamentosMonitor() {   
   const Equipamentos = await db.SelectAllbyParam("sp_consultar_equipamentos_monitoramento","");
   return Equipamentos;
}

async function GetDadosEquipamento(id) {
   const Equipamentos = await db.SelectAllbyParam("sp_consultar_dados_equipamento",id);
   return Equipamentos;
}

async function getOneEquipamento(id,id_condominio) {
   var params = [id,id_condominio];
   const Equipamentos = await db.SelectAllbyParams("sp_get_one_equipamento",params);
   return Equipamentos;
}



async function getOneCamera(id,id_condominio) {
   var params = [id,id_condominio];
   const Equipamentos = await db.SelectAllbyParams("sp_get_one_camera",params);
   return Equipamentos;
}


async function insertDadosEquipamentos(id_modelo,id_equipamento,porta,password,serial,mac,lockCount,lockCount1name,lockCount2name,lockCount3name,lockCount4name,users,fp,cards,passwds) {
   var params = [id_modelo,id_equipamento,porta,password,serial,mac,lockCount,lockCount1name,lockCount2name,lockCount3name,lockCount4name,users,fp,cards,passwds];
   const Equipamentos = await db.Insert("dados_equipamento", params);
   return Equipamentos;
}

async function UpdateDadosEquipamento(iddados_equipamento, id_modelo,id_equipamento,porta,password,serial,mac,lockCount,lockCount1name,lockCount2name,lockCount3name,lockCount4name,users,fp,cards,passwds) {
   var params = [iddados_equipamento, id_modelo,id_equipamento,porta,password,serial,mac,lockCount,lockCount1name,lockCount2name,lockCount3name,lockCount4name,users,fp,cards,passwds];
  const Equipamentos = await db.Update("dados_equipamento",params);
   return Equipamentos;
}

async function getAllComandosByEquipamento(id) {
   const Equipamentos = await db.SelectAllbyParam("sp_consultar_comandos_por_equipamento",id);
   return Equipamentos;
}

async function getEquipamentoByIP(ip) {
   const Equipamentos = await db.SelectAllbyParam("sp_buscar_equipamento_by_ip","'"+ip+"'");
   return Equipamentos;
}

async function getAllEquipamentos() {
   const Equipamentos = await db.SelectALL(tabela);
   return Equipamentos;
}


async function getOneEquipamentosById(id) {
   const Equipamentos = await db.SelectOneByParam(tabela, 'id_escola', id);
   return Equipamentos;
}
async function updateEquipamentos(id_equipamento, nome, descricao, modelo, quantidade_locks, serial, ip, gatway, mascara, conexao, tipo_comunicacao) {
   var params = [id_equipamento, nome, descricao, modelo, quantidade_locks, serial, ip, gatway, mascara, conexao, tipo_comunicacao];
   const Equipamentos = await db.Update(tabela, params);
   return Equipamentos;
}
async function insertEquipamentos(nome, descricao, modelo, quantidade_locks, serial, ip, gatway, mascara, conexao, tipo_comunicacao) {
   var params = [nome, descricao, modelo, quantidade_locks, serial, ip, gatway, mascara, conexao, tipo_comunicacao];
   const Equipamentos = await db.Insert(tabela, params);
   return Equipamentos;
}

async function getCondominioByEquipamento(ip_equipamento) {
   const Equipamentos = await db.SelectAllbyParam("sp_get_condominio_by_equipamento",ip_equipamento);
   return Equipamentos;
}


async function getMountSyncPessoas(id_condominio,id_equipamento) {
   var params =[id_condominio,id_equipamento];
   const Equipamentos = await db.SelectAllbyParams("sp_mount_pessoas_device",params);
   return    Equipamentos;
}


async function getPessoasFacialDevice(id_condominio,id_equipamento) {
   var params =[id_condominio,id_equipamento];
   const Equipamentos = await db.SelectAllbyParams("sp_mount_devices_facial",params);
   return    Equipamentos;
}




async function getMountTimezone(id_condominio) {
   const Equipamentos = await db.SelectAllbyParam("sp_mount_timezone_condominio",id_condominio);
   return Equipamentos;
}


async function InativarCamera(id_camera) {
   const Equipamentos = await db.SelectAllbyParam("sp_inativar_cameras",id_camera);
   return Equipamentos;
}



module.exports = {InativarCamera,getPessoasFacialDevice, getOneCamera,getMountTimezone,getMountSyncPessoas,getCondominioByEquipamento,getOneEquipamento,insertEquipamento,getModelosEquipamento,insertDadosEquipamentos,UpdateDadosEquipamento,GetDadosEquipamento,getEquipamentoByIP,getAllComandosByEquipamento,getAllEquipamentosMonitor, getAllEquipamentos, getOneEquipamentosById, insertEquipamentos, updateEquipamentos }
