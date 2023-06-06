function cadastrar() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nicknameVar = input_nickname.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;
    var arconteFavVar = input_arconte.value;

    if (nicknameVar == "" || emailVar == "" || senhaVar == "" || arconteFavVar == "") {
        // cardErro.style.display = "block"
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha todos os campos',
          })

        // finalizarAguardar();
        return false;
    }
    else if (emailVar.indexOf("@") == -1 || emailVar.indexOf(".com") == -1) {
        swal("Ops", "O e-mail inserido é inválido. Por favor insira novamente.", "warning")
    }
    else if (senhaVar.length < 8) {
        swal("Ops", "A senha inserida é muito curta. Por favor insira novamente.", "warning")
    }
    // else {
    //     setInterval(sumirMensagem, 5000)
    // }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nicknameServer: nicknameVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            arconteFavServer: arconteFavVar
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            // cardErro.style.display = "block";

            Swal.fire({
                icon: 'success',
                title: 'Bom Trabalho!',
                text: 'Cadastro realizado com sucesso',
              })

            setTimeout(() => {
                window.location = "signin.html";
            }, "2000")

            // limparFormulario();
            // finalizarAguardar();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Ops',
                text: 'Erro ao realizar o cadastro',
              })
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
    }