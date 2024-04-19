function montarMenu(data) {
    console.log(data);
    data = data[0];
    for (var i = 0; i < data.length; i++) {
        var display = 'none';
        if (data[i].status == 1 || objeto_pessoa.flag_morador == 0 || objeto_pessoa.flag_morador == 2) {

            display = 'flex';
        }
        console.log(data[i].id_tela);
        if (data[i].id_tela == 3) {
            if (document.getElementById("dvCamerasMenu"))
                document.getElementById("dvCamerasMenu").style.display = display;
        }
        if (data[i].id_tela != 12) {
            document.getElementById("dv" + data[i].id_tela).style.display = display;
        }

    }


    if (objeto_pessoa.flag_morador != 1) {
        document.getElementById("dv10").style.display = 'flex';
    }
    //console.log("debugando pessoa - ",objeto_pessoa.flag_morador);
    if (objeto_pessoa.flag_morador == 0) {
        document.getElementById("dv14").style.display = 'flex';
        document.getElementById("dv15").style.display = 'flex';
        document.getElementById("dv9").style.display = 'flex';
        document.getElementById("dv16").style.display = 'flex';
        document.getElementById("dv17").style.display = 'flex';
    }
    else {
        document.getElementById("dv14").style.display = 'none';
        document.getElementById("dv15").style.display = 'none';
        document.getElementById("dv9").style.display = 'none';
        document.getElementById("dv16").style.display = 'none';
        document.getElementById("dv17").style.display = 'none';
    }

}

function getTelasAppMenu() {
    var params = { id_condominio: id_condominio_geral };
    getApiAsync("POST", '/getTelasApp', params, montarMenu, '');
}