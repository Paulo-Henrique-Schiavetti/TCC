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