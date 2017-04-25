$("#connectionBtn").click(login);
$("#registerBtn").click(register);
$("#registerlink").click(switch_form);

function login() {
    var Client_Socket = io.connect('http://127.0.0.1:8370');

    Client_Socket.on('connect', function (data) {
        Client_Socket.emit('login', { login: $("#textUser").val(), password: $("#textPass").val() });
    });

    Client_Socket.on('login_response', function (data) {
        if (data.state) {
            localStorage.setItem("userId", data.id);
            window.location = "game.html";
        }
        else {
            console.log("bad password");
        }
    });
}

function register() {
    var Client_Socket = io.connect('http://127.0.0.1:8370');

    Client_Socket.on('connect', function (data) {
        Client_Socket.emit('register', { login: $("#textUser").val(), password: $("#textPass").val(), email: $("#textEmail").val() });
    });

    Client_Socket.on('register_response', function (data) {
        if (data)
        {
            switch_form()
        }
        else
        {
            console.log("error register");
        }
    });
}

function switch_form() {
    if ($("#formTitle").text() == "Login") {
        $("#formTitle").text("Register");
        $("#registerlink").text("Login");
        $("#registerBtn").show();
        $("#textEmail").show();
        $("#connectionBtn").hide();
    }
    else {
        $("#formTitle").text("Login");
        $("#registerlink").text("Register");
        $("#registerBtn").hide();
        $("#textEmail").hide();
        $("#connectionBtn").show();
    }
}