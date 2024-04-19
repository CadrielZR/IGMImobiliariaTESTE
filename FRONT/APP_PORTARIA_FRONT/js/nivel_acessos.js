function getAllNiveis() {
    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getAllNiveisCondominio", params, preencherNiveis, '');
}
function preencherNiveis(data) {
    data = data[0];
    var html = "<option value='0'>Selecione um nivel</option>";
    for (var i = 0; i < data.length; i++) {
        html += "<option value='" + data[i].id_nivelAcesso + "'>" + data[i].nome + "</option>";
    }
    document.getElementById("slcNiveis").innerHTML = html;
    document.getElementById("slcNiveisPessoas").innerHTML = html;

}

var portarias_global = [];
var timezone_global = [];
var pessoas_global = [];
function GetALLPortariasByCondominio() {
    portarias_global = [];
    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/GetALLPortariasByCondominio", params, preencherPortarias, '');
}
function preencherPortarias(data) {
    data = data[0];
    portarias_global = data;
}

function GetALLTimezonesByCondominio() {
    timezone_global = [];
    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/GetALLTimezonesByCondominio", params, preencherTimezones, '');
}
function preencherTimezones(data) {
    data = data[0];
    timezone_global = data;
}


function getConfiguracoesNivel() {
    //  $('.removeall').trigger('click');
    var id_nivel = document.getElementById("slcNiveis").value;
    var params = "id_nivel=" + id_nivel;
    getApiAsync("GET", "/getPortasTimezoneByNivel", params, preencherConfiguracaoNivel, '');
}

function preencherConfiguracaoNivel(data) {
    console.log(data);
    data = data[0];
    // document.getElementById("slcAcessosPessoas").innerHTML ="";
    // $('#slcAcessosPessoas').bootstrapDualListbox('refresh', true);
    var html = "";
    for (var i = 0; i < portarias_global.length; i++) {
        html += "<div class='row'>";
        html += "  <div class='col-sm-12'>";
        html += "    <div class='card-body'>";
        html += "      <div class='row'>";
        html += "    <div class='card backgroudPadrao shadow'>";
        html += "        <div class='col'style='align-self: center;margin-bottom: 1em;'>";
        html += "         <div class='tituloEmergencia px-3 mt-3'> ";
        html += "          <b>" + portarias_global[i].nome + "</b>";
        html += "        </div>";
        html += "        </div>";
        html += "        <div class='col-12'>";
        html += "          <select class='form-select' id='slcTimezone" + portarias_global[i].id_portaria + "'>";
        html += "            <option value='0'>SEM PERMISSAO DE ACESSO</option>";
        for (var j = 0; j < timezone_global.length; j++) {
            var selected = "";
            for (var k = 0; k < data.length; k++) {
                if (data[k].id_portaria == portarias_global[i].id_portaria && timezone_global[j].id_timezone == data[k].id_timezone) {
                    selected = "selected";
                }
            }
            html += "            <option " + selected + " value='" + timezone_global[j].id_timezone + "'>" + timezone_global[j].nome + "</option>";
        }
        html += "          </select>";
        html += "        </div>";
        html += "<br>";
        html += "        <div class='col-sm-12'style='text-align-last: right;margin-bottom: 8px;'>";
        html += "          <a href='javascript:void(0);' onclick='configurarNivel(" + portarias_global[i].id_portaria + ")' class='btn btn-success'style='font-size: 1em;'>Alterar Horário</a>";
        html += "        </div>";
        html += "      </div>";
        html += "    </div>";
        html += "    </div>";
        html += "  </div>";
        html += "</div>";
        html += "<br>";
       /*  html += "<br>"; */

/*         html += "<div class='row'>";
        html += "     <div class='col-sm-6'>";
        html += "         <b>" + portarias_global[i].nome + "</b>";
        html += "     </div>";
        html += "     <div class='col-sm-4'>";
        html += "         <select class='form-select' id='slcTimezone" + portarias_global[i].id_portaria + "'>";
        html += "<option value='0'>SEM PERMISSAO DE ACESSO</option>";
        for (var j = 0; j < timezone_global.length; j++) {
            var selected = "";
            for (var k = 0; k < data.length; k++) {
                if (data[k].id_portaria == portarias_global[i].id_portaria && timezone_global[j].id_timezone == data[k].id_timezone) {
                    selected = "selected";
                }
            }
            html += "<option " + selected + " value='" + timezone_global[j].id_timezone + "'>" + timezone_global[j].nome + "</option>";
        }
        html += "</select>";
        html += "     </div>";
        html += "     <div class='col-sm-2'>";
        html += "         <a href='javascript:void(0);' onclick='configurarNivel(" + portarias_global[i].id_portaria + ")' class='btn btn-success'>Alterar Horário</a>";
        html += "     </div>";
        html += "</div>";
        html += "<hr>"; */
    }

    document.getElementById("dvPortarias").innerHTML = html;
}

function configurarNivel(id_portaria) {
    if (window.confirm("Tem certeza que deseja realizar a alteracao de permissao de acesso para a porta?")) {
        var id_timezone = document.getElementById("slcTimezone" + id_portaria).value;
        var id_nivel = document.getElementById("slcNiveis").value;
        var params = {
            id_nivel: id_nivel,
            id_portaria: id_portaria,
            id_timezone: id_timezone
        };
        getApiAsync("POST", "/insertNivelPortariaTimezone", params, SalvoConfiguracao, '');
    }
}

function SalvoConfiguracao(data) {
    console.log(data);
    openAlert("Operação Concluida","Configurcao concedida");
}


function getAllPessoasCondominio() {
    var params = "id_condominio=" + id_condominio_geral + "&id_pessoa=0";
    getApiAsync("GET", "/getMoradoresCondominioApp", params, preenchePessoas, '');
}
function preenchePessoas(data) {
    data = data[0];
    pessoas_global = data;

}

function configuracaoNivel(data) {
    data = data[0];
    var html_sem_acesso = "";
    for (var i = 0; i < pessoas_global.length; i++) {
        var tem = 0;
        for (var j = 0; j < data.length; j++) {
            if (data[j].id_pessoa == pessoas_global[i].id_pessoa) {
                tem = 1;
            }
        }
        if (tem == 0) {
            html_sem_acesso += "<option value='" + pessoas_global[i].id_pessoa + "'>" + pessoas_global[i].nome + " " + pessoas_global[i].sobrenome + " - " + pessoas_global[i].apZK + "</option>"

        }
        else {
            html_sem_acesso += "<option selected='selected' value='" + pessoas_global[i].id_pessoa + "'>" + pessoas_global[i].nome + " " + pessoas_global[i].sobrenome + " - " + pessoas_global[i].apZK + "</option>"

        }
    }

    document.getElementById("slcPessoasNiveis").innerHTML = html_sem_acesso;
    $('#slcPessoasNiveis').bootstrapDualListbox({
        nonSelectedListLabel: 'Sem Acesso',
        selectedListLabel: 'Com Acesso',
        preserveSelectionOnMove: 'moved',
        moveOnSelect: false,
        nonSelectedFilter: ''
    });
    $('#slcPessoasNiveis').bootstrapDualListbox('refresh', true);
}

function getPessoasNivel() {
    var id_pessoa = 0;
    var id_nivel = document.getElementById("slcNiveisPessoas").value;
    var params = "id_pessoa=" + id_pessoa + "&id_nivel=" + id_nivel;
    getApiAsync("GET", "/getPessoasNivel", params, configuracaoNivel, '');
} 


function insertPessoasNivel(){
    var id_nivel = document.getElementById("slcNiveisPessoas").value;
    var id_pessoa = $('#slcPessoasNiveis').val();   
    var params =
    {
        id_nivel: id_nivel,
        id_pessoa: id_pessoa
    }
    getApiAsync("POST", "/insertNivelPessoaOk", params, NivelSalvo, id_pessoa);
}

function NivelSalvo(data){
    console.log(data);
    alert("salvo");
}