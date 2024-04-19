var user_global;
var unidades_condominio_global = [];
var pessoa_unidades_global = []
var distancia_usuario = 0;
/* REDE LOCAL*/
var timezones_sincronizar;
/**/
var urlApi = "http://192.168.0.48:3001";
var AurlApi = "http://192.168.0.48:8080"
var urlApi_fotos= "http://192.168.0.48:3001";
var urlApiZK = "http://192.168.0.147:3000";//dev 0.253 - PRod
var urlApiZK2 = "http://192.168.0.147:3000";//dev 0.253 - PRod
var urlApiFacial = "http://192.168.0.146:3005";//dev http://192.168.0.133:3501 - prod
var urlNuvem = "http://192.168.0.42/";
var wssCamera = 'wss://192.168.0.67';
var urlServicoCamera = 'https://192.168.0.67:3558';
/**/
var ULR_CAMERAS_NUVEM = "";
/*
/*FIM REDE LOCAL*/
/* NUVEM
var urlApi = "https://www.igmportariaremota.com.br:3001";
var urlApi_fotos = "https://www.igmportariaremota.com.br:3001";
var urlApi = "https://www.igmportariaremota.com.br:3001";
var urlApiZK = "https://igmcloud.igmcftv.com:3008";
var urlApiFacial = "http://igmcloud.igmcftv.com:3501";
var urlNuvem = "http://igmcloud.igmcftv.com";
var wssCamera = 'wss://igmcloud.igmcftv.com';
var urlServicoCamera = 'https://igmcloud.igmcftv.com:3558';
/* FIM NUVEM */
var id_ambiente_global = 0;
var player = [];
//var urlApi = "http://igmcloud.igmcftv.com:3001";
var ip_geral = "";
function getIp(callback) {
    function response(s) {
        callback(window.userip);
        s.onload = s.onerror = null;
        document.body.removeChild(s);
    }

    function trigger() {
        window.userip = false;

        var s = document.createElement("script");
        s.async = true;
        s.onload = function () {
            response(s);
        };
        s.onerror = function () {
            response(s);
        };

        s.src = "https://l2.io/ip.js?var=userip";
        document.body.appendChild(s);
    }

    if (/^(interactive|complete)$/i.test(document.readyState)) {
        trigger();
    } else {
        document.addEventListener('DOMContentLoaded', trigger);
    }
}

getIp(function (ip) {
    ip_geral = ip;
});

setInterval(buscarUrlCamera, 15000);
buscarUrlCamera();
function buscarUrlCamera() {
    getApiAsync("GET", '/getUrlCamera', "", setarUrlCamera, '', '');
}
function setarUrlCamera(data) {
    ULR_CAMERAS_NUVEM = data[0][0].url_camera_nuvem + "/stream.html?src=";
    ULR_CAMERAS_NUVEM = ULR_CAMERAS_NUVEM.replace("http:", "https:");
    // ULR_CAMERAS_NUVEM = "http://igmcloud.igmcftv.com:1984/stream.html?src=";
}

function insertLog(acao, descricao, funcao, retorno, id_equipamento) {
    var params = {
        id_usuario: objeto_pessoa.idpessoa,
        acao: acao,
        descricao: descricao,
        ip_maquina: ip_geral,
        funcao: funcao,
        retorno: retorno,
        id_equipamento: id_equipamento
    }
    getApiAsync("POST", '/insertLog', params, logInserido, '', '');
}

function logInserido(data) {
    console.log(data);
    console.log("Log Inserido no Sistema");
}
var imagem;
function setarInformacoes() {
    var nome_condominio = objeto_pessoa.nome_condominio.split(" ");
    var cond = "";

    for (var i = 0; i < nome_condominio.length; i++) {
        if (i > 1) {
            cond += nome_condominio[i] + " ";
        }
    }

    document.getElementById("spNomeCondominioLateral").innerHTML = cond;
    // document.getElementById("spEnderecoCondominioLateral").innerHTML = objeto_pessoa.endereco_condominio;
    document.getElementById("imgCondominio").src = urlApi + "/images/" + objeto_pessoa.id_condominio + ".png";

    //
    if (objeto_pessoa.foto != null && objeto_pessoa.foto != "" && objeto_pessoa.foto != undefined) {
        imagem = urlApi + "/pessoas/" + objeto_pessoa.idpessoa + ".png";
        console.log("imagem", imagem);
    }

    document.getElementById("imgPessoaLogada").src = imagem;
    // document.getElementById("imgPessoaIcon").src = imagem;
    document.getElementById("imgFotoCima").src = imagem;
    document.getElementById("spNomePessoaLateral").innerHTML = objeto_pessoa.nome;
    if (id_condominio_geral == 0) {
        id_condominio_geral = objeto_pessoa.id_condominio;
    }

}
function logoff() {
    sessionStorage.removeItem("usuario");
    window.location = "Login.html";
}

//var urlApi = "http://192.168.15.178:3000";
async function getApiAsync(type, metodo, params, callback, param, param2, load) {
    var retorno = "";
    //loading();
    if (type == "POST") {
        $.ajax(
            {
                type: type,
                contentType: "application/json",
                url: urlApi + metodo,
                dataType: 'json',
                data: JSON.stringify(params),
                crossDomain: true,
                async: true,
                beforeSend: function () {
                    if (load != 0)
                        loading();
                    // $('body').append('<div class="loader">Carregando. Aguarde, por favor.</div>');
                },
                success: function (data) {
                    
                    retorno = data;
                 
                   
                    callback(data, param, param2);
                    unloading();
                     return retorno;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //alert(xhr.status);
                    //alert(thrownError);
                    //alert("Erro de comunicação");
                    //alert(ajaxOptions)
                    console.log(thrownError);
                    unloading();
                }
            });
    }
    else {
        $.ajax(
            {
                type: type,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: urlApi + metodo + "?" + params,
                dataType: 'json',
                //  data:params,
                crossDomain: true,
                async: true,
                beforeSend: function () {
                    if (load != 0)
                        loading();
                    // $('body').append('<div class="loader">Carregando. Aguarde, por favor.</div>');
                },
                success: function (data) {
                    /*
                    retorno = data;
                 
                   */
                    callback(data, param, param2);
                    unloading();
                    // return retorno;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //    alert(xhr.status);
                    //   alert(thrownError);
                    unloading();
                }
            });
    }

}
function loading() {
    /* document.getElementById("dvCarregamento").style.display = "block"; */
    /*  document.getElementById("dvLoader").style.display = "block"; */
}
function unloading() {
    /*  document.getElementById("dvCarregamento").style.display = "none"; */
    /* document.getElementById("dvLoader").style.display = "none"; */
}


/*
function tituloPagina(texto)
{
    document.getElementById("SpTituloPagina").innerHTML = texto;
}
*/
function zeroFill(n) {
    return ('0' + n).slice(-2);
}

function brData(dateStr) {
    var dArr = dateStr.split("-");  // ex input: "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0]; //ex output: "18/01/10"
}
function converterData(data) {
    return data.substring(0, 10);
}

function extrairArquivo(Caminho) {
    Caminho = Caminho.replace(/\\/g, "/");
    var Arquivo = Caminho.substring(Caminho.lastIndexOf('/') + 1);
    var Extensao = Arquivo.substring(Arquivo.lastIndexOf('.') + 1);
    return { arquivo: Arquivo, extensao: Extensao };
}

function getMes(mes) {
    switch (mes) {
        case 1:
            return "Janeiro";
        case 2:
            return "Fevereiro";
        case 3:
            return "Março";
        case 4:
            return "Abril";
        case 5:
            return "Maio";
        case 6:
            return "Junho";
        case 7:
            return "Julho";
        case 8:
            return "Agosto";
        case 9:
            return "Setembro";
        case 10:
            return "Outubro";
        case 11:
            return "Novembro";
        case 12:
            return "Dezembro";
    }
}

function preencheLogin(login) {
    document.getElementById("txtUsuario").value = login;
}

async function menu(pagina) {

    $("#dvConteudoGeral").load(pagina);
    if (pagina == "menu.html") {
        var myDiv = document.getElementById('dvConteudoGeral');
        myDiv.scrollTop = 0;
    }
    zerarCameras();
}


function zerarCameras() {

    for (var i = 0; i < player.length; i++) {
        player[i].destroy();
    }
    player = [];
}

function is_img(file) {

    var ajax = new XMLHttpRequest();

    ajax.open("GET", file, true);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            var jpg = ajax.responseText;

            if (ajax.status === 200) {
                return true;
            } else {
                return false;

            }
        }
    }
}



function loadCamera() {
    //Captura elemento de vídeo
    var video = document.querySelector("#webCamera");
    //As opções abaixo são necessárias para o funcionamento correto no iOS
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    //--

    //Verifica se o navegador pode capturar mídia
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } })
            .then(function (stream) {
                //Definir o elemento vídeo a carregar o capturado pela webcam
                video.srcObject = stream;
            })
            .catch(function (error) {
                alert("Oooopps... Falhou :'(");
            });
    }
}
var foto = "";
function takeSnapShot() {
    //Captura elemento de vídeo
    var video = document.querySelector("#webCamera");

    //Criando um canvas que vai guardar a imagem temporariamente
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d');

    //Desenhando e convertendo as dimensões
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //Criando o JPG
    var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.

    sendSnapShot(dataURI); //Gerar Imagem e Salvar Caminho no Banco
}



function sendSnapShot(base64) {
    foto = base64.split(',')[1];
    document.getElementById('imgPessoa').src = "data:image/png;base64," + foto;
    $("#modalFoto").modal('hide');
}

function modalFoto() {
    $("#modalFoto").modal('show');
}

function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}



function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        // Typescript users: use following line
        // reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}
async function upload(campo) {
    const uploadedImageBase64 = await convertFileToBase64(campo.files[0]);
    return uploadedImageBase64;
}

function coletar(pin, dedo) {
    window.location = "WZKFP://*pin=" + pin + "&dedo=" + dedo;
    // window.location = "intent://scan/#Intent;scheme=whatsapp://send?#text=text=some%20text;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.whatsapp;end"
}


function openDoor(ip, porta, password, rele, time, index) {

    /*
     if (distancia_usuario == -1 || distancia_usuario > 0.2) {
         insertLog("Comando de Abertura", "Envio de comando de abertura", "Abrir porta Controladora ZK", -1, 0);
         return openAlert("Localizaçāo nāo permitida", "Voce esta a " + parseFloat(distancia_usuario).toFixed(2) + "KM do local, é necessario esta em um raio de 200 metros para enviar o comando");
     }
     reconhecimentoFacial(objeto_pessoa.idpessoa, verificadoopenDoor, ip, porta, password, rele, time);
     */
    verificadoopenDoor(ip, porta, password, rele, time, index)
}
function verificadoopenDoor(ip, porta, password, rele, time, index) {
    if (rele == 4) {
        rele = 3;
    }
    if (rele == 8) {
        rele = 4;
    }
    var params =
    {
        ip: ip,
        porta: porta,
        password: password,
        apagar: false,
        operid: 1,
        outputAddr: 1,
        rele: rele,
        time: time
    }
    insertLog("Comando de Abertura", "Envio de comando de abertura", "Abrir porta Controladora ZK", 0, 0);
    getZK("POST", "/ConnectDevice", params, openE, params, index);


}

function openE(data, params, index) {
    getZK("POST", "/OpenDoorDevice", params, logConsoleFunc, 'Pota ' + params.rele + 'Aberta por ' + params.time + ' segundos.!', index);
    //openAlert("Porta Aberta", "Comando de abertura de porta enviado por 5 segundos.");
    //  alert("Porta Aberta!");
}

function logConsoleFunc(data, texto, index) {
    console.log(data);
    //alert(data);
    data_global = data;
    VerificaPortaTrue(data.data.Success, index);
    console.log(texto);
}

var data_global;

function VerificaPortaTrue(data, index) {
    if (data) {
        // document.getElementById("btnAbertura_"+index).innerHTML = "Abrindo";
        document.getElementById("btnAbertura_" + index).disable = true;
        document.getElementById("btnAbertura_" + index).style.background = "#00e500";
        setTimeout(() => {
            document.getElementById("btnAbertura_" + index).innerHTML = "<i class='fa fa-key' id='keyIcon'>"
            document.getElementById("btnAbertura_" + index).disable = false;
            document.getElementById("btnAbertura_" + index).style.background = null;
            document.getElementById("btnAbertura_" + index).classList.remove('btn btn-primary');
            document.getElementById("btnAbertura_" + index).classList.add('btn btn-primary');

        }, 15000);
        return 0;
    }
    else {
        // document.getElementById("btnAbertura_"+index).innerHTML = "Erro, Tente novamente em 5 segundos!";
        document.getElementById("btnAbertura_" + index).style.background = "#d1001f";
        document.getElementById("btnAbertura_" + index).setAttribute('disabled', 'disabled');
        setTimeout(() => {
            document.getElementById("btnAbertura_" + index).innerHTML = "<i class='fa fa-key' id='keyIcon'>"
            document.getElementById("btnAbertura_" + index).disable = false;
            document.getElementById("btnAbertura_" + index).style.background = null;
            document.getElementById("btnAbertura_" + index).classList.remove('btn btn-primary');
            document.getElementById("btnAbertura_" + index).classList.add('btn btn-primary');
        }, 15000);
        return 0;
    }
}

function resizeImage(base64Str, targetSizeKB) {
    return new Promise((resolve) => {
        let img = new Image();
        img.src = base64Str;
        img.onload = () => {
            let canvas = document.createElement('canvas');
            let MAX_SIZE = targetSizeKB * 1024; // Convert o tamanho alvo para bytes
            let width = img.width;
            let height = img.height;
            let quality = 0.7; // Ajuste a qualidade da imagem conforme necessário (0.0 a 1.0)

            // Redimensione a imagem proporcionalmente para atingir o tamanho alvo
            let scaleFactor = Math.sqrt(MAX_SIZE / (width * height));
            let canvasWidth = width * scaleFactor;
            let canvasHeight = height * scaleFactor;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            // Converta a imagem redimensionada em base64
            let resizedImage = canvas.toDataURL('image/jpeg', quality);

            // Continue ajustando a qualidade da imagem para atingir o tamanho alvo
            while (resizedImage.length > MAX_SIZE) {
                quality -= 0.1; // Reduza a qualidade
                resizedImage = canvas.toDataURL('image/jpeg', quality);
            }

            resolve(resizedImage);
        };
    });
}


/*
function resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
        }
    })
}
*/

function sendWhatsapp(tipo_mensagem, numero, objeto) {
    var params = {
        tipo_mensagem: tipo_mensagem,
        numero: numero,
        objeto: objeto

    };
    getApiAsync("POST", '/sendWhatsapp', params, zapEnviado, '');
}
function zapEnviado() {

}


function getApiCam(type, metodo, params, callback, param, param2, load) {
    var retorno = "";
    console.log(urlServicoCamera + metodo + params);
    //loading();
    if (type == "POST") {
        $.ajax(
            {
                type: type,
                contentType: "application/json",
                url: urlServicoCamera + metodo,
                dataType: 'json',
                data: JSON.stringify(params),
                crossDomain: true,
                async: true,
                beforeSend: function () {
                    if (load != 0)
                        loading();
                    // $('body').append('<div class="loader">Carregando. Aguarde, por favor.</div>');
                },
                success: function (data) {
                    /*
                    retorno = data;
                 
                   */
                    callback(data, param, param2);
                    unloading();
                    // return retorno;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    // alert(xhr.status);
                    // alert(thrownError);
                    alert("Erro de comunicação");
                    unloading();
                }
            });
    }
    else {
        $.ajax(
            {
                type: type,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: urlServicoCamera + metodo + "?" + params,
                dataType: 'json',
                //  data:params,
                crossDomain: true,
                async: true,
                beforeSend: function () {
                    if (load != 0)
                        loading();
                    // $('body').append('<div class="loader">Carregando. Aguarde, por favor.</div>');
                },
                success: function (data) {
                    /*
                    retorno = data;
                 
                   */
                    callback(data, param, param2);
                    unloading();
                    // return retorno;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //    alert(xhr.status);
                    //   alert(thrownError);
                    unloading();
                }
            });
    }

}





function getApiFacial(type, metodo, params, callback, param, param2, load) {
    var retorno = "";
    console.log(urlApiFacial + metodo + params);
    //loading();
    if (type == "POST") {
        $.ajax(
            {
                type: type,
                contentType: "application/json",
                url: urlApiFacial + metodo,
                dataType: 'json',
                data: JSON.stringify(params),
                crossDomain: true,
                async: true,
                beforeSend: function () {
                    if (load != 0)
                        loading();
                    // $('body').append('<div class="loader">Carregando. Aguarde, por favor.</div>');
                },
                success: function (data) {
                    /*
                    retorno = data;
                 
                   */
                    callback(data, param, param2);
                    unloading();
                    // return retorno;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    // alert(xhr.status);
                    // alert(thrownError);
                    alert("Erro de comunicação");
                    unloading();
                }
            });
    }
    else {
        $.ajax(
            {
                type: type,
                headers: {
                    'Content-Type': 'application/json'
                },
                url: urlApiFacial + metodo + "?" + params,
                dataType: 'json',
                //  data:params,
                crossDomain: true,
                async: true,
                beforeSend: function () {
                    if (load != 0)
                        loading();
                    // $('body').append('<div class="loader">Carregando. Aguarde, por favor.</div>');
                },
                success: function (data) {
                    /*
                    retorno = data;
                 
                   */
                    callback(data, param, param2);
                    unloading();
                    // return retorno;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    //    alert(xhr.status);
                    //   alert(thrownError);
                    unloading();
                }
            });
    }

}
/* const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
} */


function openAlert(titulo, corpo) {
    document.getElementById("alertTitulo").innerHTML = titulo;
    document.getElementById("alertMensagem").innerHTML = corpo;
    $("#modalAlert").modal('show');
}

function fecharModalAlert() {
    $("#modalAlert").modal('hide');
    $("#modalReconhecimento").modal('hide');
    $("#modalConfirmacao").modal('hide');
}

function fecharModalX() {
    $(".modal").modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
}


function exibirToast(mensagem) {
    // Atualiza o conteúdo do toast com a mensagem recebida
    document.querySelector('#liveToast .toast-body').textContent = mensagem;
    // Exibe o toast
    const liveToast = new bootstrap.Toast(document.querySelector('#liveToast'));
    liveToast.show();
}