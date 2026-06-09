function validarFormulario(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const assunto = document.getElementById("assunto").value;
    const mensagem = document.getElementById("mensagem").value;

    let podeEnviar = true;

    document.getElementById("erroNome").textContent = "";
    document.getElementById("erroEmail").textContent = "";
    document.getElementById("erroAssunto").textContent = "";
    document.getElementById("erroMensagem").textContent = "";
    document.getElementById("mensagemSucesso").textContent = "";

    if(nome == "") {
        document.getElementById("erroNome").textContent = "O nome e obrigatorio.";
        podeEnviar = false;
    }

    if(email == "") {
        document.getElementById("erroEmail").textContent = "O e-mail e obrigatorio.";
        podeEnviar = false;
    } else {
        if(email.indexOf("@") == -1 || email.indexOf(".") == -1) {
            document.getElementById("erroEmail").textContent = "Digite um e-mail valido.";
            podeEnviar = false;
        }
    }

    if(assunto == "") {
        document.getElementById("erroAssunto").textContent = "O assunto e obrigatorio.";
        podeEnviar = false;
    }

    if(mensagem == "") {
        document.getElementById("erroMensagem").textContent = "A mensagem e obrigatoria.";
        podeEnviar = false;
    }

    if(podeEnviar == true) {
        document.getElementById("mensagemSucesso").textContent = "Mensagem enviada com sucesso!";
        document.getElementById("formContato").reset();
    }
}