const db = require('./db');



async function getTimezones(id_condominio) {
    var params = id_condominio;
    const resultado = await db.SelectAllbyParam("sp_mount_timezone_condominio", params);
    return resultado;
}

async function getPessoasSincronismo(id_pessoa, id_condominio) {
    var params = [id_pessoa, id_condominio];
    const resultado = await db.SelectAllbyParams("sp_get_sincronismo_pull", params);
    return resultado;
}


async function getMultiTags(id_pessoa, id_condominio) {
    var params = [id_pessoa, id_condominio];
    const resultado = await db.SelectAllbyParams("sp_get_pessoas_device_multitag", params);
    return resultado;
}

async function getImpressoesDigitais(id_pessoa, id_condominio) {
    var params = [id_pessoa, id_condominio];
    const resultado = await db.SelectAllbyParams("sp_get_biometria_pessoa_pull", params);
    return resultado;
}



async function insertSincronizacao(id_pessoa) {
    var params = id_pessoa;
    const Nivelacessos = await db.SelectAllbyParam('sp_insert_sincronizacao', params);
    return Nivelacessos;
}


async function insertComandosSincronizacao(id_sincronizacao, comando, id_equipamento, tipo_comando, tabela_fw) {
    var params = [id_sincronizacao, comando, id_equipamento, tipo_comando, tabela_fw];
    const Nivelacessos = await db.SelectAllbyParams('sp_insert_comandos_sincronismo', params);
    return Nivelacessos;
}

async function buscarComandosPull(id_sincronizacao) {
    var params = id_sincronizacao;
    const Nivelacessos = await db.SelectAllbyParam('sp_get_result_sincronismo', params);
    return Nivelacessos;
}

async function updateResultadoPull(resultado,id_sincronismo) {
    var params = [resultado,id_sincronismo];
    const Nivelacessos = await db.SelectAllbyParam('sp_update_resutado_pull', params);
    return Nivelacessos;

}

async function getUltimasSincronizacao(id_sincronizacao) {
    var params = id_sincronizacao;
    const Nivelacessos = await db.SelectAllbyParam('sp_get_ultimas_sincronizacoes', params);
    return Nivelacessos;

}







module.exports = { getUltimasSincronizacao,updateResultadoPull,buscarComandosPull, insertComandosSincronizacao, insertSincronizacao, getTimezones, getPessoasSincronismo, getMultiTags, getImpressoesDigitais }

