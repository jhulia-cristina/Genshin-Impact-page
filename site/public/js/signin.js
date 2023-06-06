function entrar() {
    // aguardar();

    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    if (emailVar == "" || senhaVar == "") {
        // cardErro.style.display = "block"
        swal ("Ops" , "Preencha os campos para fazer o login",  "error");
        // finalizarAguardar();
        return false;
    }
    // else {
    //     setInterval('erro', 5000)
    // }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NICKNAME_USUARIO = json.nickname;
                sessionStorage.ID_USUARIO = json.idUsuario;

                setTimeout(function () {
                    window.location = "screens/quiz.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            swal ("Ops",  "Email e/ou senha incorreto(s)" ,  "error");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
    }