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
    axios
        .post(`/login`, {
            email: email.value, senha: senha.value
        })
        .then(response => {
            if (response.data == ''){
                mensagemtemporaria('O email ou a senha estão incorretos.');
                return false;
            } else {
                login(response.data);
            }
        })
}
function login(data){
    usuario = data;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    loged = true;
    paginahome();
    mensagemtemporaria('Bem vindo '+usuario.nome+'!');

}