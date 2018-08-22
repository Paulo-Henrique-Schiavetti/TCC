function validacao(){
    
    var email = document.querySelector('#email');
    var senha = document.querySelector('#senha');

    if (email.value == '')
    {
        email.focus();
        mensagemtemporaria('Digite o email.');
        return false;
    } 
    else if (senha.value == '')
    {
        senha.focus();
        mensagemtemporaria('Digite a senha.');
        return false;
    }
    login(email.value, senha.value)
}
function login(email, senha){
   axios
        .post(`/login`, {
            email: email, senha: senha
        })
        .then(response => {
            if (response.data == ''){
                mensagemtemporaria('O email ou a senha estão incorretos.');
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