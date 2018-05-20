function cadastrarproduto() {
    var camponome = document.querySelector('#camponome').value;
    var campolocatario = 1;
    var campoavaliacao = (Math.random()*5);
    var campopreço = document.querySelector('#campopreço').value;
    var campodescrição = document.querySelector('#campodescrição').value;
    var file = document.querySelector('#campoimagem').files[0];
    var campoimagem = "";

    var reader = new FileReader();
    reader.onloadend = ()=> {
        
        campoimagem = reader.result;

        axios.post('/cadastrarproduto', {
            locatario: campolocatario, nome: camponome, avaliacao: campoavaliacao, preço: campopreço, descrição: campodescrição, imagem: campoimagem
        })
        .then(()=> {
            mensagem('O seu produto foi cadastrado!')
        })
        .catch((error)=>{
            console.log(error);
        })
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

    if (!navigator.geolocation) {
        alert('Seu browser não suporta geolocalização!</p>');
        return;
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
                axios
                    .post('/cadastrarusuario', {
                        email: campoemail, senha: camposenha, nome: camponome, endereco: campoendereco, place_id: campoplace_id, telefone: campotelefone, avaliacao: campoavaliacao
                    })
                    .then(()=> {
                        mensagem('A sua conta foi cadastrada!')
                    })
                    .catch((error)=>{
                        console.log(error);
                    });

        })
        .catch((error) => {
            console.log(error);
        });
    }
    function error(error) {
        alert(error);
    }
}