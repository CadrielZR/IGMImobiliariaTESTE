foto = "";
function getAllPessoasCondominio() {
    // mostrarCarregamento();
    if (objeto_pessoa.flag_morador != 1) {
        document.getElementById("btnNovoMorador").style.display = 'block';
        document.getElementById("dvFiltroPessoa").style.display = 'block';

    }
    var params = "id_condominio=" + id_condominio_geral + "&id_pessoa=" + objeto_pessoa.idpessoa;

    getApiAsync("GET", "/getMoradoresCondominioApp", params, prepreencherPessoa, '');
}

function getTipoPessoa() {
    var params = "";
    getApiAsync("GET", "/GetALLTipo_pessoas", params, preencherTipoPessoas, '');
}

function preencherTipoPessoas(data) {
    var html = "<option value='0'>Selecione um tipo</option>";
    data = data[0];
    for (var i = 0; i < data.length; i++) {
        html += "<option value='" + data[i].id_tipo_pessoa + "'>" + data[i].nome + "</option>";
    }
    document.getElementById("slcTipoPessoa").innerHTML = html;

}


function pessoaGlobal(id) {
    pessoa_global = id;
    getPessoaUnidades();
    getTimeZoneGlobal();


}

function getPessoaUnidades() {
    var id_pessoa = pessoa_global
    var id_condominio = id_condominio_geral
    console.log(id_pessoa)
    console.log(id_condominio)
    params = {
        id_pessoa: id_pessoa,
        id_condominio: id_condominio
    }

    getApiAsync("POST", "/getPessoaUnidades", params, redirectPessoa, '')
}

function redirectPessoa(data) {
    console.log(data[0])
    pessoa_unidades_global = data[0]
    menu("pessoa.html");
}

function getPessoasNivel() {
    var id_pessoa = 0;
    var id_nivel = document.getElementById("")
}

var resultado_global;
var unidades_condominio = unidades_condominio_global[0]

function prepreencherPessoa(data) {
    var data = data
    document.getElementById('carregando').style.visibility = 'visible'
    preenchePessoas(data)
    getPessoasbyUnidade()

}

function preenchePessoas(data) {

    data = data[0];
    resultado_global = data;
    html2 = ""
    for (var y = 0; y < unidades_condominio.length; y++) {
        //console.log(unidades_condominio[y].nome)
        html2 += "<option value='" + unidades_condominio[y].id_unidade + "' id='" + unidades_condominio[y].id_unidade + "'>" + unidades_condominio[y].nome + "</option>"
    }

    html = "";
    for (var i = 0; i < data.length; i++) {
        var imagem = "img/semfoto.png";
        if (data[i].foto != null && data[i].foto != "" && data[i].foto != undefined) {

            imagem = urlApi_fotos + "/pessoas/" + data[i].id_pessoa + ".png";

        }
        html += "<div class='col text-center mb-3' id='" + resultado_global[i].id_pessoa + "' >";
        html += "<div class='card backgroudPadrao shadow'>";
        if (objeto_pessoa.flag_morador != 1) {
            html += "<a href='javascript:void(0);' onclick='apagarUsuario(" + data[i].id_pessoa + ");' style='color:red;font-size:19px;' class='text-center'><i class='fa fa-trash'></i></a>";
        }
        html += "    <figure onclick='pessoaGlobal(" + data[i].id_pessoa + ");' class='shadow avatar ms-auto me-auto mb-0 mt-2 w100 zoom mx-auto' style='border-radius:11px!important;'>";
        html += "        <img src='" + imagem + "' style='border-radius:11px!important;height:100px;object-fit: cover;' alt='image' class=' shadow w-100 '>";
        html += "    </figure>";
        html += "    <h4 onclick='pessoaGlobal(" + data[i].id_pessoa + ");' class='-500  font-xsss  text-center'>" + data[i].nome + "</h4>";
        if (data[i].apZK != null) {
            html += "    <h4 onclick='pessoaGlobal(" + data[i].id_pessoa + ");' class='text-grey-500 fw-500  font-xsss  text-center mb-3'>" + data[i].apZK + "</h4>";
        }
        html += "</div>";
        html += "</div>";
    }
    document.getElementById('carregando').style.visibility = 'hidden'
    document.getElementById("txtApartamentoFiltro").innerHTML = html2
    document.getElementById("slcUnidade").innerHTML = html2
    document.getElementById("dvResultado").innerHTML = html;
    esconderCarregamento();

}
function apagarUsuario(id_pessoa) {
    if (window.confirm("Tem certeza que deseja excluir o morador? não é possível recuperar.")) {
        var params = {
            id_pessoa: id_pessoa,
            id_condominio: id_condominio_geral
        };

        getApiAsync("POST", "/deletarMoradorEspecifico", params, ApagarEuipamentos, '');

        getApiAsync("POST", "/deletarMorador", params, getAllPessoasCondominio, '');
    }
}
function ApagarEuipamentos(data) {
    console.log(data);
}


function getPessoasFiltro() {
    var id_condominio = 29;
    var nome = document.getElementById("txtNomeFiltro").value.trim();
    var cpf = document.getElementById("txtCpfFiltro").value.trim();
    var apartamento = document.getElementById("txtApartamentoFiltro").value.trim();

    var data = [];
    for (var i = 0; i < resultado_global.length; i++) {
        /*  if (resultado_global[i].id_condominio != id_condominio && id_condominio != "0") {
              console.log("condominio");
              // return;
              //  data.push(resultado_global[i]);
          }*/
        if (resultado_global[i].nome.trim() != nome && nome != "") {
            console.log("nome");
            //  return;
            //  data.push(resultado_global[i]);
        }

        else if (resultado_global[i].documento.trim() != cpf && cpf != "") {
            console.log("cpf");
            //   return;
            //  data.push(resultado_global[i]);
        }
        else if (resultado_global[i].apZK != apartamento && apartamento != "") {
            console.log("ap");
            //   return;
            //  data.push(resultado_global[i]);
        }
        else {
            data.push(resultado_global[i]);
        }
    }

    html = "";
    for (var i = 0; i < data.length; i++) {
        var imagem = "img/semfoto.png";
        if (data[i].foto != null && data[i].foto != "" && data[i].foto != undefined) {


            imagem = urlApi_fotos + "/pessoas/" + data[i].id_pessoa + ".png";

        }
        html += "<div class='col-lg-6 text-center' >";
        html += "<a href='javascript:void(0);' onclick='apagarUsuario(" + data[i].id_pessoa + ");' style='color:red;font-size:25px;'><i class='fa fa-remove'></i></a>";
        html += "    <figure onclick='pessoaGlobal(" + data[i].id_pessoa + ");' class='avatar ms-auto me-auto mb-0 mt-2 w100'><img";
        html += "            src='" + imagem + "' style='border-radius:60px!important;' alt='image'";
        html += "            class='shadow-sm rounded-3 w-100'></figure>";
        html += "    <h4 onclick='pessoaGlobal(" + data[i].id_pessoa + ");' class='text-grey-600 fw-500 mb-3 font-xsss mb-4'>" + data[i].nome + "</h4>";
        html += "    <h4 onclick='pessoaGlobal(" + data[i].id_pessoa + ");' class='text-grey-500 fw-500 mb-3 font-xsss mb-4'>" + data[i].apZK + "</h4>";
        html += "</div>";
    }
    document.getElementById("dvResultado").innerHTML = html;
}

var countPessoa = 0
var unidades_by_pessoa_global = []



/*async function getPessoasbyUnidade(data) {
    if (countPessoa <= 0) {
        unidades_by_pessoa_global = []
    }
    console.log(data)
    unidades_condominio = unidades_condominio_global[0]
    if (countPessoa > 1) {
        console.log(data)
        unidades_by_pessoa_global.push(data[0][0])
    }
    if (countPessoa >= resultado_global.length) {
        countPessoa = 0
        preenchePessoasByUnidade()
    }
    else {
        var id_pessoa = resultado_global[countPessoa].id_pessoa
        var id_unidade = document.getElementById('slcUnidade').value
        var params = {
            id_condominio: id_condominio_geral,
            id_pessoa: id_pessoa,
            id_unidade: id_unidade
        }
        countPessoa++
        getApiAsync('POST', '/getPessoasbyUnidade', params, getPessoasbyUnidade, '')
    }

}*/

async function getPessoasbyUnidade() {
    var id_pessoas_lista = []
    for(var i= 0; i< resultado_global.length; i++){
        id_pessoas_lista.push(resultado_global[i].id_pessoa)
    }
    id_pessoas_lista = id_pessoas_lista.toString()
    var params = {
        id_pessoa: id_pessoas_lista
    }
    console.log(params)
    getApiAsync('POST', '/getPessoasbyUnidade', params, preenchePessoasByUnidade, '')

}


function preenchePessoasByUnidade(data) {
    //var data = unidades_by_pessoa_global
    console.log(data[0])
    var data = data[0]
    unidades_by_pessoa_global = data
    preenchePessoasByUnidade2()
    //console.log(data.map( item => { return item.id_unidade = 1 }));
}

function preenchePessoasByUnidade2() {
    //var data = unidades_by_pessoa_global
    //console.log(data.map( item => { return item.id_unidade = 1 }));
    var ap = document.getElementById("slcUnidade").value
    for (var i = 0; i < resultado_global.length; i++) {
        document.getElementById(resultado_global[i].id_pessoa).style.visibility = 'collapse'
        document.getElementById(resultado_global[i].id_pessoa).style.display = 'none'
    }

    for (var i = 0; i < unidades_by_pessoa_global.length; i++) {
        if (unidades_by_pessoa_global[i].id_unidade == ap) {
            document.getElementById(unidades_by_pessoa_global[i].id_pessoa).style.visibility = 'visible'
            document.getElementById(unidades_by_pessoa_global[i].id_pessoa).style.display = 'flex'
            console.log('yes')
        }
        else {
            document.getElementById(unidades_by_pessoa_global[i].id_pessoa).style.visibility = 'collapse'
            document.getElementById(unidades_by_pessoa_global[i].id_pessoa).style.display = 'none'

            console.log('no')
        }
    }
}



function limparMorador() {
    pessoa_global = 0;
    pessoa_universal = "";
}

function alterarStatus() {
    var status = 0;
    if (document.getElementById("chkAplicativo").checked) {
        status = 1;
    }
    var params = {
        id_pessoa: pessoa_global,
        status: status
    }
    getApiAsync("POST", "/LiberarAplicativo", params, getOnePessoas, '');
}

function acessoFacial() {
    var status = 0;
    if (document.getElementById("chkAcessoFacial").checked) {
        status = 1;
    }
    var params = {
        id_pessoa: pessoa_global,
        status: status
    }
    //  getApiAsync("POST", "/LiberarFacial", params, getOnePessoas, '');
}

function preparaFuncionarioAtendente() {
    if (document.getElementById("chkAtendente").checked == false) {
        params = {
            id_pessoa: pessoa_universal.id_pessoa
        }
        menu("pessoa.html")
        return getApiAsync("POST", "/desativaFuncionarioAtendente", params, getOnePessoas, '');
    }
    var params = "placeholder = " + 0;
    getApiAsync("GET", "/getGruposAtendente", params, funcionarioAtendente, '')
}

function funcionarioAtendente(data) {
    grupos = data[0];
    console.log(grupos)
    var status = 0;
    if (pessoa_universal.id_atendente != null && pessoa_universal.foto_atendente != null && pessoa_universal.id_atendente != "" && pessoa_universal.foto_atendente != ""
        && pessoa_universal.status_atendente !== "" && pessoa_universal.status_atendente !== null) {

        menu("pessoa.html")
        return reativaFuncionarioAtendente()
    }
    else {
        alert(pessoa_universal.id_atendente)
        alert(pessoa_universal.foto_atendente)
        alert(pessoa_universal.status_atendente)
        html = ""
        html += "<label> Qual grupo o(a) Atendente fará parte:</label>"
        html += "<form id='atendenteForm'>"
        for (var i = 0; i < grupos.length; i++) {
            html += "<div class='row'>"
            html += "<div class='col-sm-2' style= 'padding: 10px;text-align: center; width:auto; margin-left : 100px'>"
            html += "<input type='checkbox' id=" + grupos[i].id_grupo + " name='grupos' value=" + grupos[i].id_grupo + ">"
            html += "</div>"
            html += "<div class='col-md-8' style = 'text-align: left;padding: 2px;margin-left: 10px; width:200px'>"
            html += "<label for=" + grupos[i].id_grupo + ">" + grupos[i].nome + "</label>"
            html += "</div>"
            html += "</div>"
        }
        html += "</form>"
        html += "<button onclick='processaFuncionarioAtendente()' style='border: unset; margin-top: 10px;' type = 'submit' class= 'bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block'>Confirmar</button>"
        document.getElementById("dvVisualizarAtendente").innerHTML = html;
        $("#modalAtendente").modal('show');
    }
}

function reativaFuncionarioAtendente() {
    params = {
        id_pessoa: pessoa_universal.id_pessoa
    }
    menu("pessoa.html")
    return getApiAsync("POST", "/reativaFuncionarioAtendente", params, getOnePessoas(), '');

}

function processaFuncionarioAtendente() {
    var foto_atendente = pessoa_universal.id_pessoa
    alert(foto_atendente)
    var params = {
        id_pessoa: pessoa_global,
        nome: pessoa_universal.nome,
        email: pessoa_universal.email,
        senha: 123456,
        cpf: pessoa_universal.documento,
        foto_atendente: foto_atendente,
        id_acesso: 1,
        status: 1,
        setor: 1,
        funcao: 1,
        chamado: 1
    }
    getApiAsync("POST", "/funcionarioAtendente", params, postGrupos(), '')
}
var checkbox_number = 0
function postGrupos() {
    setTimeout(() => {
        var form = document.getElementById('atendenteForm');
        var checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
        var valores = [];
        checkboxes.forEach(function (checkbox) {
            valores.push(checkbox.value);
        });
        if (checkbox_number < valores.length) {
            params = {
                id_pessoa: pessoa_global,
                id_grupo: valores[checkbox_number],
                id_administradir: 0
            }
            checkbox_number++
            return getApiAsync("POST", "/funcionarioGrupoMembro", params, postGrupos(), '');
        }
        else {
            fecharModalX();
            openAlert("Operação Concluida", "Pessoa inserida como atendente");
            menu("pessoa.html")
            return getOnePessoas()
        }

    }, "300");

}

function getOnePessoas() {
    //mostrarCarregamento();
    if (pessoa_global != 0) {
        var params = "id_pessoa=" + pessoa_global;
        getApiAsync("GET", "/GetOnePessoa", params, prencherPessoa, '');
    }
    if (pessoa_global == 0) {
        prencherNovaPessoa()
        getAllNiveis()
    }
}
var pessoa_universal = [];

function prencherNovaPessoa() {
    html = ""
    for (var i = 0; i < unidades_condominio.length; i++) {
        html += "<option value='" + unidades_condominio[i].id_unidade + "'id='" + unidades_condominio[i].id_unidade + "'>" + unidades_condominio[i].nome + "</option>"
    }
    document.getElementById("txtApartamento").innerHTML = html
}

function prencherPessoa(data) {
    data = data[0][0];
    pessoa_universal = data;
    getAllNiveis();
    var img = "img/semfoto.png";
    if (data.foto != null || data.foto != "" || data.foto != undefined) {

        img = urlApi_fotos + "/pessoas/" + data.id_pessoa + ".png";
        foto = data.foto;

    }

    document.getElementById("chkAplicativo").checked = false;
    if (data.aplicativo == 1) {
        document.getElementById("chkAplicativo").checked = true;
    }
    if (id_condominio_geral == 1) {
        document.getElementById("chkAtendenteLabel").style.display = 'inline-block'
        document.getElementById("chkAtendente").checked = false;
        if (data.status_atendente == 1) {
            document.getElementById("chkAtendente").checked = true;
            document.getElementById("editaAtendente").style.display = 'inline';
            document.getElementById("editaAtendenteLinha").style.display = 'inline';
        }
    }

    if (objeto_pessoa.flag_morador != 1) {
        //  document.getElementById("dvFiltroPessoa").style.display = 'block';
        document.getElementById("dvBiometrias").style.display = 'block';
    }
    document.getElementById("imgPessoa").src = img;
    document.getElementById("spNome").innerHTML = data.nome;
    document.getElementById("spApartamento").innerHTML = data.apZK;
    document.getElementById("slcTipoPessoa").value = data.id_tipo_pessoa;
    html = ""
    for (var i = 0; i < unidades_condominio.length; i++) {
        html += "<option value='" + unidades_condominio[i].id_unidade + "'id='" + unidades_condominio[i].id_unidade + "'>" + unidades_condominio[i].nome + "</option>"
    }
    document.getElementById("txtApartamento").innerHTML = html
    if (pessoa_global != 0) {
        for (var k = 0; k < pessoa_unidades_global.length; k++) {
            if (data.apZK == unidades_condominio[k].nome) {
                document.getElementById("txtApartamento").value = pessoa_unidades_global[k].id_unidade;
            }
        }
    }


    document.getElementById("txtRamal").value = data.telefone;
    document.getElementById("txtNome").value = data.nome;
    document.getElementById("txtSobrenome").value = data.sobrenome;
    document.getElementById("txtCpf").value = data.documento;
    document.getElementById("txtEmail").value = data.email;
    document.getElementById("txtCelular").value = data.celular;
    document.getElementById("txtDataNascimento").value = data.data_nascimento;

    document.getElementById("txtRg").value = data.rg;
    document.getElementById("txtVeiculo").value = data.veiculo;
    document.getElementById("txtPlaca").value = data.placa;
    document.getElementById("txtCor").value = data.cor;
    document.getElementById("txtObservacao").value = data.obs1;

    if (objeto_pessoa.id_condominio == 1 || objeto_pessoa.id_condominio == 29) {
        // document.getElementById("linkEquipamento").style.display = "block";
    }
    esconderCarregamento();
}

/*
function salvarPessoa() {
    var nome = document.getElementById("txtNome").value;
    var sobrenome = document.getElementById("txtSobrenome").value;
    var cpf = document.getElementById("txtCpf").value;
    var email = document.getElementById("txtEmail").value;
    var celular = document.getElementById("txtCelular").value;
    var data_nascimento = document.getElementById("txtDataNascimento").value;

    var params = {
        nome: nome,
        sobrenome: sobrenome,
        cpf: cpf,
        email: email,
        celular: celular,
        data_nascimento: data_nascimento
    }
    console.log(params);
}

*/


function getAllPessoasCondominioChat() {
    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getMoradoresCondominio", params, preenchePessoasChat, '');
}

var moradores = "";
function preenchePessoasChat(data) {
    data = data[0];
    moradores = data;
    html = "";
    for (var i = 0; i < data.length; i++) {
        var imagem = "img/semfoto.png";
        if (data[i].foto != null && data[i].foto != "" && data[i].foto != undefined) {



            imagem = urlApi_fotos + "/pessoas/" + data[i].id_pessoa + ".png";

        }
        html += "<li class='bg-transparent list-group-item no-icon pe-0 ps-0 pt-2 pb-2 border-0 d-flex align-items-center'>";
        html += "<figure class='avatar float-left mb-0 me-2'>";
        html += "    <img src='" + imagem + "' alt='image' style='border-radius: 30px;'   class='w35'>";
        html += "</figure>";
        html += "<h3 class='fw-700 mb-0 mt-0'>";
        html += "    <a class='font-xssss text-grey-600 d-block text-dark model-popup-chat' href='#'>" + data[i].nome + (data[i].apZK != null ? " - " + data[i].apZK : "") + "</a>";
        html += "</h3>";
        //  html += "<span class='badge badge-primary text-white badge-pill fw-500 mt-0'>2</span>";
        html += "</li>";
    }
    document.getElementById("dvMoradoresChat").innerHTML = html;

}

function salvarPessoa() {
    var id_pessoa = pessoa_global;
    var id_tipo_pessoa = document.getElementById("slcTipoPessoa").value;
    var nome = document.getElementById("txtNome").value;
    var sobrenome = document.getElementById("txtSobrenome").value;
    var documento = document.getElementById("txtCpf").value;
    var email = document.getElementById("txtEmail").value;
    var celular = document.getElementById("txtCelular").value;
    var data_nascimento = document.getElementById("txtDataNascimento").value;
    if (data_nascimento == "") {
        openAlert("Erro", "data de nascimento é obrigatoria!");
        return;
    }
    var rg = document.getElementById("txtRg").value;
    var obs1 = document.getElementById("txtObservacao").value;
    var veiculo = document.getElementById("txtVeiculo").value;
    var placa = document.getElementById("txtPlaca").value;
    var cor = document.getElementById("txtCor").value;
    var data = new Date();
    let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate()));
    var inicio = dataFormatada;
    var dataFim = new Date();
    dataFim.setDate(dataFim.getDate() + 365);
    let dataFimFormatada = (dataFim.getFullYear() + "-" + ((dataFim.getMonth() + 1)) + "-" + (dataFim.getDate()));
    var fim = dataFimFormatada;
    var status = 1;
    var celular2 = "";
    var cartao = "";
    var senha = "";
    var obs2 = "";
    var telefone = document.getElementById("txtRamal").value;
    var apto = document.getElementById("txtApartamento").value;
    var apto_name = ""
    for (var i = 0; i < unidades_condominio.length; i++) {
        if (apto == unidades_condominio[i].id_unidade) {
            apto_name = unidades_condominio[i].nome
        }
    }
    var apartamento = apto_name
    var id_nivel = document.getElementById("slcNivelAcessoPessoa").value;

    var condominio = id_condominio_geral;
    if (pessoa_universal != "") {
        celular2 = pessoa_universal.celular2;
        cartao = pessoa_universal.cartao;
        senha = pessoa_universal.senha;
        obs2 = pessoa_universal.obs2;


    }

    var params = {
        id_pessoa: id_pessoa,
        id_tipo_pessoa: id_tipo_pessoa,
        nome: nome,
        sobrenome: sobrenome,
        documento: documento,
        cartao: cartao,
        senha: senha,
        email: email,
        celular: celular,
        celular2: celular2,
        foto: foto,
        inicio: inicio,
        fim: fim,
        status: status,
        data_nascimento: data_nascimento,
        obs1: obs1,
        obs2: obs2,
        veiculo: veiculo,
        placa: placa,
        cor: cor,
        telefone: telefone,
        rg: rg,
        apartamento: apartamento,
        condominio: condominio,
        id_nivel: id_nivel
    };
    openAlert("Salvando Pessoa", "Salvando Pessoa");

    getApiAsync("POST", "/insertPessoas", params, SalvoPessoa, id_pessoa);

}

function SalvoPessoa(data, id_pessoa) {
    console.log(data);
    var id_pessoa = pessoa_global;
    var apartamento = document.getElementById("txtApartamento").value;
    var params = {
        id_pessoa: id_pessoa,
        apartamento: apartamento
    }


    getApiAsync("POST", "/insertPessoaUnidade", params, redirecionaSalvo, id_pessoa, '')
    // sincronizarGeralGlobal();
    //   menu('moradores.html');
}

function redirecionaSalvo(data, id_pessoa) {
    console.log(data);

    if (id_pessoa > 0) {
        sincronizarGeralGlobal();
    }
    else if (id_pessoa == 0) {
        menu('moradores.html');
    }
}

async function uploadFilePessoa() {
    foto = await upload(document.getElementById("fileFacial"));
    // Redimensiona a imagem
    const maxFileSizeKB = 100; // Limite de tamanho em kilobytes
    const resizedImage = await resizeImage(foto, maxFileSizeKB);

    foto = resizedImage.split(',')[1];
    document.getElementById('imgPessoa').src = "data:image/jpg;base64," + foto;
    document.getElementById("fileFacial").value = "";
    console.log(foto);
    // foto = foto.split(';')[1].split(',')[1];
    // document.getElementById('imgPessoa').src = "data:image/png;base64," + foto;
    // document.getElementById("fileFacial").value = "";
}


function buscarBiometrias() {
    var params = "idpessoa=" + pessoa_global;
    getApiAsync("GET", "/getAllImpressao_digitalsByPessoa", params, biometria);
}

function preparaEditAtendente() {
    var params = "placeholder = " + 0;
    getApiAsync("GET", "/getGruposAtendente", params, preparaEditAtendente2, '')
}

function preparaEditAtendente2(data) {
    grupo = data[0]
    console.log(grupo)
    var params = {
        id_atendente: pessoa_global
    }
    console.log(params)
    getApiAsync("POST", "/getGruposMembros", params, EditAtendente, grupo, '')
}

function EditAtendente(data, grupo) {
    data = data[0]
    grupos = grupo
    console.log(data)
    var status = 0;
    html = ""
    html += "<label> Qual grupo o(a) Atendente fará parte:</label>"
    html += "<form id='atendenteForm'>"
    for (var i = 0; i < grupos.length; i++) {
        html += "<div class='row'>"
        html += "<div class='col-sm-2' style= 'padding: 10px;text-align: center; width:auto; margin-left : 100px'>"
        html += "<input type='checkbox' id='" + grupos[i].id_grupo + "' name='grupos' value=" + grupos[i].id_grupo + ">"
        html += "</div>"
        html += "<div class='col-md-8' style = 'text-align: left;padding: 2px;margin-left: 10px; width:200px'>"
        html += "<label>" + grupos[i].nome + "</label>"
        html += "</div>"
        html += "</div>"
    }

    html += "</form>"
    html += "<button onclick='preProcessaEditarAtendente()' style='border: unset; margin-top: 10px;' type = 'submit' class= 'bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block'>Confirmar</button>"
    document.getElementById("dvVisualizarAtendente").innerHTML = html;
    for (var i = 0; i < grupos.length; i++) {
        var checkbox_list = document.getElementById(grupos[i].id_grupo)
        console.log(checkbox_list)
        for (var k = 0; k < data.length; k++) {
            if (data[k].id_grupo == checkbox_list.value) {
                checkbox_list.checked = true
            }
        }
    }
    $("#modalAtendente").modal('show');
}

function preProcessaEditarAtendente() {
    params = {
        id_pessoa: pessoa_global
    }

    getApiAsync("POST", "/preEditarGrupoMembro", params, postGrupos(), '');

}

function biometria(data) {
    console.log(data);
    var digital = data[0];
    te = digital;
    var html = "<div class='row'>";
    html += "<div class=\"col-lg-6\">" +
        "     <center><img src=\"img/mao.png\" width=\"100%\"></center>" +
        " </div>";
    html += "<div class='col-lg-6 row' style='font-size:14px!important;'>";
    for (var y = 0; y < digital.length; y++) {
        var cor = "red";
        if (digital[y].possui > 0)
            cor = "green";
        html += "<div class='col-lg-3' style='border:solid 1px black;'>" +
            "  <center><span style='color:" + cor + "'>" + digital[y].nome + "</span></center>" +
            "  <center><a href='javascript:void(0);' onclick='coletar(" + pessoa_global + "," + digital[y].descricao + ");'>Coletar</a></center> " +
            " </div>";
    }
    html += "</div><br>";
    html += "</div>";

    document.getElementById("dvImpressaoDigital").innerHTML = html;
    $("#modalBiometria").modal('show');
}


function buscarCartoes() {
    if (pessoa_global > 0) {
        var params = "id_pessoa=" + pessoa_global;
        getApiAsync("GET", "/getTagsPessoa", params, cartoes);
    }
    else {
        $("#modalControles").modal('show');
    }
}


function addControlePessoa() {
    var numero = document.getElementById("txtControle").value;
    var id_porta = document.getElementById("slcControleGaragem").value;
    //alert(id_porta);
    if (numero == "" || id_porta == 0) {
        return openAlert("Erro", "Necessario selecionar a garagem e preencher o numero do controle");
    }
    var id_pessoa = pessoa_global;
    var params = {
        numero: numero,
        id_porta: id_porta,
        id_pessoa: id_pessoa
    }
    getApiAsync("POST", "/insertTagPessoa", params, buscarCartoes, '');
}


function addTagPessoa() {
    var numero = document.getElementById("txtTag").value;
    var id_porta = 0;
    var id_pessoa = pessoa_global;
    var params = {
        numero: numero,
        id_porta: id_porta,
        id_pessoa: id_pessoa
    }
    getApiAsync("POST", "/insertTagPessoa", params, buscarCartoes, '');
}

function cartoes(data) {
    data = data[0];
    var html = "";
    var html_controle = "";
    for (var i = 0; i < data.length; i++) {
        if (data[i].id_porta == 0) {
            html += "<div class='row'>";
            html += "<div class='col-lg-5'>" + data[i].porta + "</div>";
            html += "<div class='col-lg-5'>" + data[i].numero + "</div>";
            html += "<div class='col-lg-2'><a href='javascript:void(0);' onclick='deletarTag(" + data[i].id_pessoa_cartoes + ")'><i class='fa fa-remove'></i></a></div>";
            html += "</div>";
        }
        else {
            html_controle += "<div class='row'>";
            html_controle += "<div class='col-lg-3'>" + data[i].porta + "</div>";
            html_controle += "<div class='col-lg-3'>" + data[i].numero + "</div>";
            html_controle += "<div class='col-lg-2'><a href='javascript:void(0);' onclick='deletarTag(" + data[i].id_pessoa_cartoes + ")'><i class='fa fa-remove'></i></a></div>";
            html_controle += "</div>";
        }
    }
    document.getElementById("dvTags").innerHTML = html;
    document.getElementById("dvControles").innerHTML = html_controle;
    $("#modalControles").modal('show');
}

function deletarTag(id_tag) {
    var params = {
        id_tag: id_tag
    }
    getApiAsync("POST", "/DeleteTagPessoa", params, buscarCartoes, '');
}


function getAllPortasCondominio() {
    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getAllPortariasByCondominio", params, preenchePortas, '');
}
function preenchePortas(data) {
    data = data[0];
    html = "<option id='0'>Selecione a Garagem</option>";
    for (var i = 0; i < data.length; i++) {
        var img = "img/porta.png";
        if (data[i].nome.includes('Garagem')) {
            html += "<option value='" + data[i].id_portaria + "'>" + data[i].nome + "</option>";
        }

    }
    document.getElementById("slcControleGaragem").innerHTML = html;

}

function getPessoasMultiTag() {
    var params = "id_pessoa=0&id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getPessoasDeviceMultiTag", params, preencherPessoas, '');
}

function getPessoasMultiTagIndividual(id_pessoa) {
    var params = "id_pessoa=" + id_pessoa + "&id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getPessoasDeviceMultiTag", params, preencherPessoas, '');
}





function getPessoaSincronizar() {
    var params = "id_pessoa=" + pessoa_global + "&id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getPessoasDevice", params, preencherPessoas, '');
}

function preencherPessoas(data) {
    data = data[0];
    for (var i = 0; i < data.length; i++) {
        pessoas_sincronizar.push(data[i]);
        id_atual = data[i].pin;
    }
}


var pessoas_sincronizar = [];
//timezones_sincronizar = "";

function getTimeZoneGlobal() {

    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getMountTimezone", params, preencherTimeZone, '');
    // syncModal.show();
}

function preencherTimeZone(data) {
    data = data[0];
    timezones_sincronizar = data;
    getPessoaSincronizar();
}



function SyncDevice(ip, porta, password) {
    ConnectDevice(ip, porta, password, 0, 0, false);
    addUserDevice(ip, porta, password);
}
function addTimezone(ip, porta, password) {
    for (var i = 0; i < timezones_sincronizar.length; i++) {
        var params = {
            ip: ip,
            porta: porta,
            password: password,
            timezone: timezones_sincronizar[i].timezone,
            SunTime1: timezones_sincronizar[i].SunTime1,
            SunTime2: timezones_sincronizar[i].SunTime2,
            SunTime3: timezones_sincronizar[i].SunTime3,
            MonTime1: timezones_sincronizar[i].MonTime1,
            MonTime2: timezones_sincronizar[i].MonTime2,
            MonTime3: timezones_sincronizar[i].MonTime3,
            TueTime1: timezones_sincronizar[i].TueTime1,
            TueTime2: timezones_sincronizar[i].TueTime2,
            TueTime3: timezones_sincronizar[i].TueTime3,
            WedTime1: timezones_sincronizar[i].WedTime1,
            WedTime2: timezones_sincronizar[i].WedTime2,
            WedTime3: timezones_sincronizar[i].WedTime3,
            ThuTime1: timezones_sincronizar[i].ThuTime1,
            ThuTime2: timezones_sincronizar[i].ThuTime2,
            ThuTime3: timezones_sincronizar[i].ThuTime3,
            FriTime1: timezones_sincronizar[i].FriTime1,
            FriTime2: timezones_sincronizar[i].FriTime2,
            FriTime3: timezones_sincronizar[i].FriTime3,
            SatTime1: timezones_sincronizar[i].SatTime1,
            SatTime2: timezones_sincronizar[i].SatTime2,
            SatTime3: timezones_sincronizar[i].SatTime3,
            Hol1Time1: timezones_sincronizar[i].Hol1Time1,
            Hol1Time2: timezones_sincronizar[i].Hol1Time2,
            Hol1Time3: timezones_sincronizar[i].Hol1Time3,
            Hol2Time1: timezones_sincronizar[i].Hol2Time1,
            Hol2Time2: timezones_sincronizar[i].Hol2Time2,
            Hol2Time3: timezones_sincronizar[i].Hol2Time3,
            Hol3Time1: timezones_sincronizar[i].Hol3Time1,
            Hol3Time2: timezones_sincronizar[i].Hol3Time2,
            Hol3Time3: timezones_sincronizar[i].Hol3Time3
        }
        console.log(params);
        getZK("POST", "/AddTimezoneDevice", params, logConsole, 'Timezone ' + timezones_sincronizar[i].timezone + ' Inserido do Equipamento!', false);
        if (i + 1 == timezones_sincronizar.length) {
            addUserDevice(ip, porta, password);
        }
    }
}
function addUserDevice(ip, porta, password) {
    var user = 0;
    var comando = "";
    var tabela = "user";
    var comando_ant = "1";
    var multitag = 0;
    for (var i = 0; i < pessoas_sincronizar.length; i++) {
        //   if (pessoas_sincronizar[i].pin != user) {       
        if (pessoas_sincronizar[i].multitag != null && pessoas_sincronizar[i].multitag != undefined && pessoas_sincronizar[i].multitag == 1) {
            multitag = 1;
        }
        if (comando_ant != pessoas_sincronizar[i].pin) {
            comando += "Pin=" + pessoas_sincronizar[i].pin + "-CardNo=" + (pessoas_sincronizar[i].cardno.toString() == "" ? 0 : pessoas_sincronizar[i].cardno) + "-Password=" + (pessoas_sincronizar[i].pass == "" ? 0 : pessoas_sincronizar[i].pass) + "-Name=" + pessoas_sincronizar[i].name.trim().replace("-", "") + "-Group=0---";
        }
        else {
            if (multitag == 1) {
                console.log(multitag);
                comando += "Pin=9" + pessoas_sincronizar[i].pin + "-CardNo=" + (pessoas_sincronizar[i].cardno.toString() == "" ? 0 : pessoas_sincronizar[i].cardno) + "-Password=" + (pessoas_sincronizar[i].pass == "" ? 0 : pessoas_sincronizar[i].pass) + "-Name=" + pessoas_sincronizar[i].name.trim().replace("-", "") + "-Group=0---";
                console.log(comando);
            }
        }
        comando_ant = pessoas_sincronizar[i].pin;
    }
    var params = {
        ip: ip,
        porta: porta,
        password: password,
        tabela: tabela,
        comando: comando
    };
    console.log(comando);


    getZK("POST", "/insertMultiplesUsers", params, logConsole, '', false);
    AddAuthorizeUserDevice(ip, porta, password);

}
function AddAuthorizeUserDevice(ip, porta, password) {
    ConnectDevice(ip, porta, password, 0, 0, false);
    // data = data.data;
    var comando = "";
    //  if (data.Success) {
    console.log("Usuários Adicionados");
    var tabela = "userauthorize";
    var comando_ant = "1";
    var multitag = 0;
    for (var i = 0; i < pessoas_sincronizar.length; i++) {
        if (pessoas_sincronizar[i].multitag != null && pessoas_sincronizar[i].multitag != undefined && pessoas_sincronizar[i].multitag == 1) {
            multitag = 1;
        }
        if (comando_ant != pessoas_sincronizar[i].pin) {

            comando += "Pin=" + pessoas_sincronizar[i].pin + "-AuthorizeTimezoneId=1-AuthorizeDoorId=15---";
        }
        else {
            if (multitag == 1) {
                comando += "Pin=9" + pessoas_sincronizar[i].pin + "-AuthorizeTimezoneId=1-AuthorizeDoorId=15---";
            }
        }
        comando_ant = pessoas_sincronizar[i].pin;
        //   comando += "Pin=" + pessoas_sincronizar[i].pin + "-AuthorizeTimezoneId=" + pessoas_sincronizar[i].timezone + "-AuthorizeDoorId=" + pessoas_sincronizar[i].autorizeDoorId + "---";
    }
    var params = {
        ip: ip,
        porta: porta,
        password: password,
        tabela: tabela,
        comando: comando
    };
    console.log(comando);
    getZK("POST", "/insertMultiplesUsers", params, logConsole, '', false);
    ConnectDevice(ip, porta, password, 0, 0, false);

    if (pessoas_sincronizar[0].multitag != null && pessoas_sincronizar[0].multitag != undefined && pessoas_sincronizar[0].multitag == 1) {
        multitag = 1;
    }
    if (multitag == 0) {
        AddUserFPDevice(ip, porta, password);
    }
    // }
}

async function AddUserFPDevice(ip, porta, password) {
    var test = await ConnectDevice(ip, porta, password, 0, 0, false);
    // if (data.Success) {
    console.log("Autorizações Concedidas");
    var comando = "";
    var tabela = "templatev10";
    var id_pessoa = 0;
    var id_finger = 0;
    var j = 0;
    var quant = 0;
    for (var i = 0; i < pessoas_sincronizar.length; i++) {
        if (pessoas_sincronizar[i].FirgerId != null & pessoas_sincronizar[i].FirgerId != "") {
            if (id_pessoa == pessoas_sincronizar[i].pin || j == 0) {
                if (pessoas_sincronizar[i].FirgerId != id_finger) {
                    comando += "Pin=" + pessoas_sincronizar[i].pin + "-FingerID=" + pessoas_sincronizar[i].FirgerId + "-Valid=" + pessoas_sincronizar[i].tipoDedo + "-Template=" + pessoas_sincronizar[i].template + "---";
                    /*  var params = {
                          ip: ip,
                          porta: porta,
                          password: password,
                          tabela: tabela,
                          comando: comando
                      };
                      console.log("INCLUINDO " + j + " Impressões");
                      var teste = await getZK("POST", "/insertMultiplesUsers", params, concluirProcessamento, '', false);
                      console.log(teste);*/
                    j++;
                }
            }
            else {
                var params = {
                    ip: ip,
                    porta: porta,
                    password: password,
                    tabela: tabela,
                    comando: comando
                };
                console.log("INCLUINDO " + quant + " Impressões");
                j = 0;
                quant = 0;
                comando = "";
                comando += "Pin=" + pessoas_sincronizar[i].pin + "-FingerID=" + pessoas_sincronizar[i].FirgerId + "-Valid=" + pessoas_sincronizar[i].tipoDedo + "-Template=" + pessoas_sincronizar[i].template + "---";
                test = await ConnectDevice(ip, porta, password, 0, 0, false);
                var teste = await getZK("POST", "/insertMultiplesUsers", params, concluirProcessamento, '', false);
                console.log(teste);
            }

            id_pessoa = pessoas_sincronizar[i].pin;
            id_finger = pessoas_sincronizar[i].FirgerId;
            /*   if (quant == 50) {
   
               }*/

        }
        quant++;
    }
    var params = {
        ip: ip,
        porta: porta,
        password: password,
        tabela: tabela,
        comando: comando
    };
    console.log("INCLUINDO " + quant + " Impressões");
    j = 0;
    quant = 0;
    test = await ConnectDevice(ip, porta, password, 0, 0, false);
    var teste = await getZK("POST", "/insertMultiplesUsers", params, concluirProcessamento, '', false);
    console.log(teste);

}
// Temos que analizar o renomeamento dessa função já q ela possui nome igual a outras
function logConsole(data, texto, start, ip, porta, password) {
    console.log(texto);
    //alert(data);
    if (start) {
        addTimezone(ip, porta, password);
    }
}
function concluirProcessamento(data) {
    console.log("aqio");
    // console.log(data);
    //data = data.data;
    // if (data.Success) {
    console.log("Impressões Digitais Cadastradas");
    openAlert("Operação Concluida", "Sincronização Concluída!");
    // syncModal.hide();
    //}
}



function getAllNiveis() {
    var params = "id_condominio=" + id_condominio_geral;
    getApiAsync("GET", "/getAllNiveisCondominio", params, preencherNiveis, '');
}
function preencherNiveis(data) {
    data = data[0];
    var html = "<option value='0'>Selecione um nivel</option>";
    for (var i = 0; i < data.length; i++) {
        var selected = "";
        if (pessoa_universal.id_nivel == data[i].id_nivelAcesso) {
            selected = "selected";
        }
        html += "<option " + selected + " value='" + data[i].id_nivelAcesso + "'>" + data[i].nome + "</option>";
    }
    document.getElementById("slcNivelAcessoPessoa").innerHTML = html;


}
