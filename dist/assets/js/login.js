function validacaoEmail(){
    var email = document.querySelector('#email');
    if (email.value == '')
    {
        email.focus();
        mensagemtemporaria('Digite o email.');
        return false;
    }
    axios
        .post(`/getEmail`, {
            email: email.value
        })
        .then(response => {
            if (response == undefined){
                mensagemtemporaria('O email não existe ou está incorreto.');
                return false;
            } else {
                console.log(response);
                paginalogar2(email.value, response.data.nome);
                document.querySelector('#icone').src = response.data.imagemMenor;
            }
        })
}

function validacaoSenha(email){
    var senha = document.querySelector('#senha');

    if (senha.value == '')
    {
        senha.focus();
        mensagemtemporaria('Digite a senha.');
        return false;
    }
    login(email, senha.value);
}

function login(email, senha){
    axios
         .post(`/login`, {
             email: email, senha: senha
         })
         .then(response => {
             if (response.data == ''){
                 mensagemtemporaria('A senha está incorreta.');
                 return false;
             } else {
                 usuario = response.data;
                 localStorage.setItem('usuario', JSON.stringify(usuario));
                 loged = true;
                 paginahome();
                 mensagemtemporaria('Bem vindo '+usuario.nome+'!');
             }
         }) 
 }

 function logoff() {
     usuario = [];
     localStorage.setItem("usuario", "");
 }