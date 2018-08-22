function cadastrarproduto() {
    var camponome = document.querySelector('#camponome');
    var campolocatario = usuario.id;
    var campoavaliacao = usuario.avaliacao;
    var campopreço = document.querySelector('#campopreço');
    var campodescricao = document.querySelector('#campodescriçao');
    var campodatapub = Date.now();
    var file = document.querySelector('#campoimagem').files[0];

    if(camponome.value == '')
    {
        camponome.focus()
        mensagemtemporaria('digite o nome.')
        return false;
    }
    else if(campopreço.value == '')
    {
        campopreço.focus()
        mensagemtemporaria('digite o preço.')
        return false;
    }
    else if(file == undefined)
    {
        mensagemtemporaria('selecione a imagem.')
        return false;
    } 

    var reader = new FileReader();
    
    reader.onloadend = ()=> {
        campoimagem = reader.result;

        axios.post('/cadastrarproduto', {
            locatario: campolocatario, nome: camponome.value, avaliacao: campoavaliacao, preço: campopreço.value, descrição: campodescricao.value, data_publicacao: campodatapub, imagem: campoimagem
        })
        .then(()=> {
            mensagemtemporaria('Seu item foi cadastrado!')
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    reader.readAsDataURL(file);
}

function cadastrarusuario() {
    var campoemail = document.querySelector('#campoemail').value;
    var camposenha = document.querySelector('#camposenha').value;
    var camponome = document.querySelector('#camponome').value;
    var campotelefone = document.querySelector('#campotelefone').value;
    var campoavaliacao = 5;
    var campoendereco = '';
    var campoplace_id = '';
    var file = document.querySelector('#campoimagem').files[0];

    if (campoemail == '')
    {
        campoemail.focus();
        mensagemtemporaria('Digite o email.');
        return false;
    } 
    else if (camposenha == '')
    {
        camposenha.focus();
        mensagemtemporaria('Digite a senha.');
        return false;
    }
    else if (!navigator.geolocation) {
        alert('Seu browser não suporta geolocalização!</p>');
        return;
    }
    else if(file == undefined)
    {
        mensagemtemporaria('selecione a imagem.')
        return false;
    }

    navigator.geolocation.getCurrentPosition(sucess, error, {
        enableHighAccuracy: true
      });

    function sucess(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        axios
            .post(`/geolocate`,{ lat, lng })
            .then((response) => {

                campoendereco = response.data.address;
                campoplace_id = response.data.place_id;

                var reader = new FileReader();
                reader.onloadend = ()=> {
                    campoimagem = reader.result;
                    axios
                        .post('/cadastrarusuario', {
                            email: campoemail, senha: camposenha, nome: camponome, endereco: campoendereco, place_id: campoplace_id, telefone: campotelefone, avaliacao: campoavaliacao, imagem: campoimagem
                        })
                        .then(()=>{
                            mensagemtemporaria('A sua conta foi cadastrada!');
                            login(campoemail, camposenha);
                        })
                        .catch((error)=>{
                            console.log(error);
                        });
                }
                reader.readAsDataURL(file);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    function error(error) {
        alert(error);
    }
}