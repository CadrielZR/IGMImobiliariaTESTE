function getAllCondominios() {
    var params = "id_condominio=0";
    getApiAsync("GET", "/GetAllCondominios", params, preencheCondominios, '');
}
function preencheCondominios(data) {
    data = data[0];
    console.log(data);
    var html = "";
    condominio_global_objeto = data;
    for (var i = 0; i < data.length; i++) {

        html += " <a class='contact-name' href='javascript:void(0);' onclick='setarCondominio(" + data[i].id_condominio + "," + i + ")'><li class=\"list-group-item d-flex justify-content-between align-items-center\">";
        html += "   <img style='border-radius:15px' height='100px' width='100px' src='" + urlApi + "/images/" + data[i].id_condominio + ".png'>";
        html += "<b>" + data[i].nome + "</b>";
        // html += "   <span class=\"badge bg-primary rounded-pill\">14</span>";
        html += "</li>";
    }
    document.getElementById("dvCondominio").innerHTML = html;

}

function setarCondominio(id_condominio, index) {
    condominio_global_objeto = condominio_global_objeto[index];
    console.log(condominio_global_objeto);
    id_condominio_geral = id_condominio;
    getTimeZoneGlobalFinal();
   // geocodeAddress(condominio_global_objeto.endereco);
    menu('menu.html');
    setarInformacoes();
    getAllPessoasCondominioChat();
    getGerenciamentoEquipamentos();
    getPermissoesAcessosCondominio();
    getUnidadesCondominio()
    getPessoasUnidades()
    //var params = "id_condominio=" + condominio_global_objeto.id_condominio;
    //getApiAsync("GET", "/GetAllCondominios", params, redirectMenu, '');
    // location.href = 'header.html';
}

function getUnidadesCondominio(){
    var params = "id_condominio="+ id_condominio_geral;
    getApiAsync("GET", "/GetUnidadesCondominio", params, preencheUnidades, '');
}

function preencheUnidades(data){
    unidades_condominio_global = data
}

