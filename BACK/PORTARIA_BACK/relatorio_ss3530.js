const db = require('./db');
var axios = require('axios');
const request = require('request-promise-native'); // Certifique-se de importar a biblioteca corretamente



async function buscarTodosSS3530(dataInicial, dataFinal) {
    var sql = ('call sp_get_equipamentos_by_modelo(10)');
    var result = await db.ExecutQuery(sql);
    result = result[0];
    for (var i = 0; i < result.length; i++) {
        buscarAcessosSS3530(result[i].id_equipamento, result[i].ip + ":" + result[i].conexao, "admin", "INSIDE3igmigm", dataInicial, dataFinal)
    }
    //  return result;
}



async function buscarAcessosSS3530(id_equipamento, ip, usuario, senha, dataInicial, dataFinal) {
    const deviceIP = ip;
    const username = usuario;
    const password = senha;
    const type = 'GET';

    const startTimestamp = new Date(dataInicial).getTime();
    const endTimestamp = new Date(dataFinal + 'T23:59:59Z').getTime();
    const diffDays = Math.ceil((endTimestamp - startTimestamp) / (24 * 60 * 60 * 1000));

    // Iterar sobre os dias
    for (let i = 0; i < diffDays; i++) {
        const currentDate = new Date(startTimestamp + i * 24 * 60 * 60 * 1000);
        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);

        const startOfDayInSeconds = Math.floor(startOfDay.getTime() / 1000);
        const endOfDayInSeconds = Math.floor(endOfDay.getTime() / 1000);

        const urlCompleta = `http://${deviceIP}/cgi-bin/recordFinder.cgi?action=find&name=AccessControlCardRec&StartTime=${startOfDayInSeconds}&EndTime=${endOfDayInSeconds}`;
        console.log("inserindo");
        const response = await SendIntelbras("", username, password, urlCompleta, type);
        sincronizarEquipamento(id_equipamento, parseRecords(response));
    }
    console.log("conculido");
  //  return { resultados: results };
}


function parseRecords(response) {
    const records = [];
    const lines = response.split('\n');
    let record = {};

    for (const line of lines) {
        if (line.trim() === '') continue;

        const [key, value] = line.split('=');

        if (key.startsWith('records[')) {
            const [, index, field] = key.match(/records\[(\d+)\]\.(\w+)/);

            if (!record[index]) {
                record[index] = {};
            }

            record[index][field] = value.trim();
        } else {
            // Handle other properties if needed
        }
    }

    // Convert object to array
    records.push(...Object.values(record));

    return records;
}



async function sincronizarEquipamento(id_equipamento, data) {
    var sql = "insert IGNORE into acessos_indepedentes (cod_acesso_device, id_equipamento, evento, data_evento, status, userId, hora_evento, tipo_acesso,id_rele,card_no) values";
    for (var i = 0; i < data.length; i++) {
        if (data[i].Status > 0) {
            sql += "(";
            sql += data[i].RecNo + ",";
            sql += id_equipamento + ",";
            sql += "'0',";
            sql += "'" + convertCreateTimeToDateTime(data[i].CreateTime) + "',";
            sql += "'0',";
            sql += "'" + data[i].UserID + "',";
            sql += "'" + convertCreateTimeToTime(data[i].CreateTime) + "',";
            sql += "'0',";
            sql += "'1',";
            sql += "'" + data[i].CardNo + "'";
            sql += ")";

            if (i + 1 < data.length) {
                sql += ",";
            } else {
                sql += ";";
            }
        }
        else {
            if (i + 1 < data.length) {
            }
            else {
                sql = sql.slice(0, -1);
                sql += ";";
            }
        }

    }

    const result = await db.ExecutQuery(sql);
    return result;
}

function convertCreateTimeToDateTime(createTime) {
    const timestamp = parseInt(createTime);
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toISOString().slice(0, 19).replace("T", " ");
}

function convertCreateTimeToTime(createTime) {
    const timestamp = parseInt(createTime);
    const date = new Date(timestamp * 1000); // Convert to milliseconds
    return date.toTimeString().slice(0, 8);
}

async function SendIntelbras(parms, username, password, url, method) {
    try {
        const resposta = await request({
            'url': url,
            'method': method,
            'auth': {
                'user': username,
                'password': password,
                'sendImmediately': false
            },
            'followRedirect': true,
            'followAllRedirects': true,
            'json': false,
            'body': parms
        });


        return resposta; // Retorna o objeto completo da resposta
    } catch (ex) {

        return "erro " + ex;
    }
}

module.exports = { buscarAcessosSS3530, buscarTodosSS3530 }