
async function TestConnect(host, user, password, database, port) {
    const mysql = require("mysql2/promise");
    var config =
    {
        host: host,
        user: user,
        password: password,
        database: database,
        port: port
    };
    try {
        const connection = await mysql.createConnection(config);
        return {

            sucesso: true,
            msg: "Conexao OK"
        };
    }
    catch(ex)
    {
        return {

            sucesso: false,
            msg: "Conexao Falhou "+ex
        };
    }

}

const mysql = require("mysql2/promise");

const configMaster = {
    //host: '191.252.178.158',
    //  host: '192.95.56.125',
    //host:'192.168.0.146',
    host:'3.128.230.77',
    user: 'igmsch_igm',
    password: 'igmTecnologia@2022',
    database: 'igmsch_port',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 2000,
    queueLimit: 0
};

const configSlave = {
    host: '192.95.56.125',
    user: 'igmsch_igm',
    password: 'igmTecnologia@2022',
    database: 'igmsch_port',
    port: 3307,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 0
};
let globalConnection = null;
async function tryConnect(config) {
    try {
        const connection = await mysql.createPool(config);
        console.log('Conectado com sucesso!');
        return connection;
    } catch (error) {
        console.error('Erro na conexão:', error);
        // Aguarde alguns segundos antes de tentar novamente
        await new Promise(resolve => setTimeout(resolve, 5000));
        return tryConnectWithRetry(config); // Tente novamente
    }
}

async function connect_forcado() {


   console.log('Tentando conectar no servidor mestre...');
   const connectionMaster = await tryConnect(configMaster);
   if (connectionMaster) {
       globalConnection = connectionMaster;
       return connectionMaster;
   }

   console.log('Falha na conexão com o servidor mestre. Tentando o servidor escravo...');
   const connectionSlave = await tryConnect(configSlave);
   if (connectionSlave) {
       globalConnection = connectionSlave;
       return connectionSlave;
   }

   throw new Error('Não foi possível conectar em nenhum servidor.');
}



async function connect() {
     if (globalConnection && globalConnection !== 'disconnected') {
         return globalConnection;
     }
 
    console.log('Tentando conectar no servidor mestre...');
    const connectionMaster = await tryConnect(configMaster);
    if (connectionMaster) {
        globalConnection = connectionMaster;
        return connectionMaster;
    }

    console.log('Falha na conexão com o servidor mestre. Tentando o servidor escravo...');
    const connectionSlave = await tryConnect(configSlave);
    if (connectionSlave) {
        globalConnection = connectionSlave;
        return connectionSlave;
    }

    throw new Error('Não foi possível conectar em nenhum servidor.');
}


/* Executar Query Avulsa Pronta*/
async function ExecutQuery(query) {
    try {
        const conn = await connect();
        // console.log(query);
        const [rows] = await conn.query(query);
        // console.log(rows);
        return rows;
    }
    catch (ex) {
        return mensagemErro(ex, 'Erro na execução da Query');
    }
}

async function ExecutQuerys(queries) {
    const results = [];

    try {
        for (const query of queries) {

            const conn = await connect_forcado(); // Obtém uma nova conexão para cada consulta
            try {
                const [rows] = await conn.query(query);
                results.push(`Consulta executada com sucesso: ${query}`);
            } catch (error) {
                results.push(`Erro na execução da consulta: ${query} - ${error.message}`);
            } finally {
                conn.end(); // Fecha a conexão após cada consulta
            }
        }

        return results;
    } catch (error) {
        return `Erro na execução das consultas: ${error.message}`;
    }
}



//selectAll
async function SelectALL(tabela) {
    try {
        const conn = await connect();
        const [rows] = await conn.query('call sp_consultar_todas_' + tabela + '();');
        return rows;
    }
    catch (ex) {
        return mensagemErro(ex, 'call sp_consultar_todas_' + tabela + '();');
    }
}
//Select One por ID
async function SelectOneByParam(tabela, parametro, valor) {
    try {
        const conn = await connect();
        const [rows] = await conn.query('call sp_consultar_uma_' + tabela + '(' + valor + ');');
        return rows;
    }
    catch (ex) {
        return mensagemErro(ex, 'call sp_consultar_uma_' + tabela + '(\'' + valor + '\');');
    }
}

//select all por categoria recebendo o nome da procedure
async function SelectAllbyParam(procedure, valor) {
    try {
        const conn = await connect();
        console.log('call ' + procedure + '(' + valor + ');');
        const [rows] = await conn.query('call ' + procedure + '(' + valor + ');');
        return rows;
    } catch (ex) {
        return mensagemErro(ex, 'call ' + procedure + '(\'' + valor + '\');');
    }
}


async function SelectAllbyParamsAntiga(procedure, valores) {
    try {
        const conn = await connect();
        var params = "";
        for (var i = 0; i < valores.length; i++) {
            params += '"' + valores[i] + '"';
            if ((i + 1) < valores.length) {
                params += ",";
            }
        }
        console.log('call ' + procedure + '(' + params + ');');
        const [rows] = await conn.query('call ' + procedure + '(' + params + ');');
        return rows;
    }
    catch (ex) {
        return mensagemErro(ex, 'call ' + procedure + '(' + params + ');');
    }
}


async function executeQueryInBackground(procedure, valores) {
    return new Promise(async (resolve, reject) => {
        try {
            const conn = await connect();
            const params = valores.map(val => `"${val}"`).join(',');
            const query = `call ${procedure} (${params});`;
            console.log(query);
            const [rows] = await conn.query(query);
            //console.log("Executou a Query");
            resolve(rows);
        } catch (ex) {
            return mensagemErro(ex, 'call ' + procedure + '(' + valores + ');');
        }
    });
}

async function SelectAllbyParams(procedure, valores) {
    try {
        // Execute as consultas em segundo plano com pequenos atrasos entre elas
        const results = await Promise.all([executeQueryInBackground(procedure, valores)]);
        console.log(results.length);
        return results[0];
    } catch (ex) {
        console.log(ex);
        return mensagemErro(ex, `call ${procedure} (${valores.join(',')});`);
    }
}




async function SelectAllbyParams2(procedure, valores) {
    try {
        const conn = await connect();
        var params = "";
        for (var i = 0; i < valores.length; i++) {
            params += valores[i];
            if ((i + 1) < valores.length) {
                params += ",";
            }
        }
        console.log('call ' + procedure + '(' + params + ');');
        const [rows] = await conn.query('call ' + procedure + '(' + params + ');');

        return rows;
    }
    catch (ex) {
        return mensagemErro(ex, 'call ' + procedure + '(' + params + ');');
    }
}
//Insert 
async function Insert(tabela, valores) {
    try {
        const conn = await connect();
        var params = "";
        for (var i = 0; i < valores.length; i++) {
            params += '"' + valores[i] + '"';
            if ((i + 1) < valores.length) {
                params += ",";
            }
        }
        console.log('call sp_criar_' + tabela + '(' + params + ');');
        const [rows] = await conn.query('call sp_criar_' + tabela + '(' + params + ');');
        return rows;
    } catch (ex) {
        return mensagemErro(ex, 'call sp_criar_' + tabela + '(' + params + ');');
    }
}
//Update 
async function Update(tabela, valores) {
    try {
        const conn = await connect();
        var params = "";
        for (var i = 0; i < valores.length; i++) {
            params += '"' + valores[i] + '"';
            if ((i + 1) < valores.length) {
                params += ",";
            }
        }
        const [rows] = await conn.query('call sp_atualizar_' + tabela + '(' + params + ');');
        return rows;
    } catch (ex) {
        return mensagemErro(ex, 'call ' + procedure + '(\'' + valor + '\');');
    }
}

async function Delete(tabela, valor) {
    try {
        const conn = await connect();

        const [rows] = await conn.query('call sp_deletar_' + tabela + '(' + valor + ');');
        return rows;
    } catch (ex) {
        return mensagemErro(ex, 'call ' + procedure + '(\'' + valor + '\');');
    }
}
function mensagemErro(ex, metodo) {
    return {

        0: {
            error: 1,
            metodo: metodo,
            mensagemErro: ex
        }

    }
}
module.exports = { SelectAllbyParamsAntiga,ExecutQuerys, SelectAllbyParams2, ExecutQuery, TestConnect, SelectALL, SelectOneByParam, Insert, Update, Delete, SelectAllbyParam, SelectAllbyParams }
