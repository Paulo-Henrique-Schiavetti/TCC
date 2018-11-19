function prepararImagem(evt){
    var compress = new Compress();
    var reader = new FileReader();

    var arquivo = [...event.target.files];

    compress.compress(arquivo, {
        size: 4, // the max size in MB, defaults to 2MB
        quality: .75, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
      }).then((data)=>{
        localStorage.setItem('imagemCompleta', data[0].prefix+data[0].data);
    }, false);

    compress.compress(arquivo, {
        size: 1, // the max size in MB, defaults to 2MB
        quality: .75, // the quality of the image, max is 1,
        maxWidth: 320, // the max width of the output image, defaults to 1920px
        maxHeight: 240, // the max height of the output image, defaults to 1920px
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      }).then((data)=>{
        localStorage.setItem('imagemMenor', data[0].prefix+data[0].data);
        miniatura.src = data[0].prefix+data[0].data;
    }, false);
}

function cadastrarproduto() {
    var campolocatario = usuario.id;
    var campoavaliacao = usuario.avaliacao;
    var campodatapub = Date.now();

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
    else if(localStorage.getItem('imagemCompleta') == "")
    {
        mensagemtemporaria('selecione a imagem.')
        return false;
    }
    var imagemCompleta = localStorage.getItem('imagemCompleta');
    var imagemMenor = localStorage.getItem('imagemMenor');
    axios.post('/cadastrarproduto', {
        locatario: campolocatario, nome: camponome.value, avaliacao: campoavaliacao, preço: campopreço.value, descrição: campodescricao.value, data_publicacao: campodatapub, imagemCompleta: imagemCompleta, imagemMenor: imagemMenor
    })
    .then(()=> {
        mensagemtemporaria('Seu item foi cadastrado!')
        localStorage.setItem('imagemCompleta', "");
        localStorage.setItem('imagemMenor', "");
    })
    .catch((error)=>{
        console.log(error);
    });

        
}

function cadastrarusuario() {
    var campoavaliacao = 5;
    var campoendereco = '';
    var campoplace_id = '';

    if (campoemail.value == '')
    {
        campoemail.focus();
        mensagemtemporaria('Digite o email.');
        return false;
    } 
    else if (camposenha.value == '')
    {
        camposenha.focus();
        mensagemtemporaria('Digite a senha.');
        return false;
    }
    else if (!navigator.geolocation) {
        alert('Seu browser não suporta geolocalização!</p>');
        return;
    }
    else if(localStorage.getItem('imagemCompleta') == "")
    {
        mensagemtemporaria('selecione a imagem.')
        return false;
    }
    if (localcheck.checked) {
        navigator.geolocation.getCurrentPosition(sucess, error, {
            enableHighAccuracy: true
          });
    } else {
        var imagemCompleta = localStorage.getItem('imagemCompleta');
        var imagemMenor = localStorage.getItem('imagemMenor');

        axios
            .post('/cadastrarusuario', {
                email: campoemail.value, senha: camposenha.value, nome: camponome.value, telefone: campotelefone.value, avaliacao: campoavaliacao, imagemMenor: imagemMenor, imagemCompleta: imagemCompleta
            })
            .then(()=>{
                mensagemtemporaria('A sua conta foi cadastrada!');
                localStorage.setItem('imagemCompleta', "");
                localStorage.setItem('imagemMenor', "");
                login(campoemail.value, camposenha.value);
            })
            .catch((error)=>{
                console.log(error);
            });
    }
    

    function sucess(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        axios
            .post(`/geolocate`,{ lat, lng })
            .then((response) => {
                campoendereco = response.data.address;
                campoplace_id = response.data.place_id;
                var imagemCompleta = localStorage.getItem('imagemCompleta');
                var imagemMenor = localStorage.getItem('imagemMenor');

                axios
                    .post('/cadastrarusuario', {
                        email: campoemail.value, senha: camposenha.value, nome: camponome.value, endereco: campoendereco, place_id: campoplace_id, telefone: campotelefone.value, avaliacao: campoavaliacao, imagemMenor: imagemMenor, imagemCompleta: imagemCompleta
                    })
                    .then(()=>{
                        mensagemtemporaria('A sua conta foi cadastrada!');
                        localStorage.setItem('imagemCompleta', "");
                        localStorage.setItem('imagemMenor', "");
                        login(campoemail.value, camposenha.value);
                    })
                    .catch((error)=>{
                        console.log(error);
                    });
                })
    }
    function error(error) {
        alert(error);
    }
}