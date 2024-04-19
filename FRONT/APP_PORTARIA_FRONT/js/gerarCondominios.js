function getCondominiosImobiliaria() {
    console.log(1)
    data = sessionStorage.getItem("usuario_data");
    if(data == null || data == "" || data == undefined){
        return console.log(0);
    }
    else
    var id_imobiliaria = JSON.parse(data)
    console.log(id_imobiliaria)
    var id = id_imobiliaria.id_imobiliaria
    console.log(id)
    var params = {
        id_imobiliaria: id
    }
    getApiAsync("POST", "/getCondominiosImobiliaria", params, preencheCondominiosImobiliaria, '', '');
}

function preencheCondominiosImobiliaria(data){
    var data= data[0]
    console.log(data)
    var html = "";
    var storage = JSON.stringify(data[0]);
    for (var i = 0; i < data.length; i++) {
        html += " <a class='contact-name' href='/options' href='javascript:void(0);' onclick='setarCondominio(" + data[i].id_condominio + "," + i + ")'><li class=\"list-group-item d-flex justify-content-between align-items-center\" style='padding: 10px;background: transparent;border-style: solid;border-width: 4px 4px 4px 4px;border-color: gray;border-radius: 1.3rem;'>";
        html += "   <img style='border-radius:15px' height='100px' width='100px' src='" + urlApi + "/images/" + data[i].id_condominio + ".png'>";
        html += "<b>" + data[i].nome + "</b>";
        // html += "   <span class=\"badge bg-primary rounded-pill\">14</span>";
        html += "</li>";
    }
    sessionStorage.setItem('usuario_data',storage)
    document.getElementById("dvCondominio").innerHTML = html;
}

function setarCondominio(id, index){
    getApiAsync("GET", "/options", id, logar,'','');
}

function logar(){
    console.log(1)
}