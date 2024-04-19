
if (sessionStorage.getItem("usuario") != null & sessionStorage.getItem("usuario") != undefined) {
    objeto_pessoa = JSON.parse(sessionStorage.getItem("usuario"));
    //window.location = "/";
}
function login() {
    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var params = {
        user: user,
        senha: password
    }
    getApiAsync("POST", "/loginApp", params, logar,'','');
}

function logar(data) {
    console.log(2)
    data = data[0];
    var storage = JSON.stringify(data[0]);
    console.log(storage)
    if (data.length <= 0) {
        return alert("Login ou senha incorretos")
    }
    else {
        var user = JSON.stringify(data[0]);
        sessionStorage.setItem('usuario', user);
        sessionStorage.setItem('usuario_data',storage)
        window.location = "/";
        //location.href = '/';
    }

}
