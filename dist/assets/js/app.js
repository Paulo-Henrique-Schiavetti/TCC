window.onload = () => {
    let content = document.querySelector("#content");
    let lista = document.querySelector("#lista");
    let pesquisar = document.querySelector("#pesquisar");
    let dropdown = document.querySelector("#dropdown");
    let verdadeiralista = document.querySelector("#verdadeiralista");
    let modal = document.querySelector("#modal");
    //variáveis
    dados = [];
    localStorage.getItem('numitem') ? "" : localStorage.setItem('numitem', 0);
    numitem = parseInt(localStorage.getItem('numitem'));
    localStorage.getItem('dados') ? dadosexistentes() : localStorage.setItem('dados', "");
    //funções
    
    setTimeout(() => {
        paginahome();
    }, 100);
    setTimeout(() => {
        content.addEventListener("click", clicaritem);
        pesquisar.addEventListener("keyup", pesquisa);
        lista.addEventListener("click", mostrarlista);
    }, 500);
};

function exibiritens() {
    for(i=0;i<9;i++){
        localData = localStorage.getItem('data');
        axios
        .get(`/itens/${localData}`)
        .then(response => {
            var element = response.data;
                var estrelas = '';
                for(e=0;e<5;e++){
                    if (element.avaliacao>=1) {
                        estrelas += '<i class="material-icons">star</i>'
                    } else {
                        if (element.avaliacao>0) {
                            estrelas += '<i class="material-icons">star_half</i>'
                        } else {
                            estrelas += '<i class="material-icons">star_border</i>'
                        }
                    }
                    element.avaliacao -= 1;
                }
            localData = element.data;
            localStorage.setItem('data', localData);
            item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagem, element.endereco, estrelas);
        });
    }
}
function clicaritem(element){

    element.path[5].dataset.id ? id = element.path[5].dataset.id : id = element.path[4].dataset.id;

    if(element.path[1].classList.contains('btnalugar') || element.path[0].classList.contains('btnalugar')){
        alugar(id);
    } else if(element.path[1].classList.contains('btnadd') || element.path[0].classList.contains('btnadd')) {
        add(id);
    }
}
function alugar(id){
    var comentarios = "";
    dropdown.innerHTML = "";
    pesquisar.style = "border-radius: 50px";
    axios
        .get(`/pesquisarid/${id}`)
        .then(response => {
            element = response.data;
            paginaitem(element.id, element.nome, element.endereco, element.imagem);
        });
}
function exibircomentarios() {
    let campocomments = document.querySelector("#comentarios");
    axios
        .get(`/comentarios/${id}`)
        .then(response => {
            response.data.forEach(comments => {
                campocomments.innerHTML += '<p>'+comments.nome+': '+comments.mensagem+'</p>';
            });
        });
}
function add(id) {
    axios
        .get(`/pesquisarid/${id}`)
        .then(response => {
            dados[numitem] = response.data;
            numitem ++;
            localStorage.setItem("numitem", numitem);
            localStorage.setItem('dados', JSON.stringify(dados));
            novoitem();
            mensagemtemporaria('O item foi adicionado a lista ->');
        });
}
function pesquisa() {
    nome = pesquisar.value;
    numerodeitensnodrop = 0;
    dropdown.innerHTML = "";
    
    axios
        .get(`/pesquisarnome/${nome}`)
        .then(response => {
            if(nome == "" || response.data.length == 0){
                pesquisar.style = "border-radius: 50px";
                return;

            } else {
                pesquisar.style = "border-top-right-radius: 30px; border-top-left-radius: 30px;border-bottom-right-radius: 0; border-bottom-left-radius: 0";
            }
            response.data.forEach(element => {
                numerodeitensnodrop++;
                if(numerodeitensnodrop>4){
                    dropdown.innerHTML += `<li class="dropdown-li tres-pontos"><a>...</a></li>`;
                    return true;
                }
            dropdown.innerHTML += `<li class="dropdown-li"><a onclick="alugar(${element.id})"><img src="${element.imagem}" alt=""><span>${element.nome}</span></a></li>`;
            })
        });
}

function mensagem(texto) {
    modal.style.display = "block";
    modal.innerHTML = texto;
}

function mensagemtemporaria(texto) {
    modal.style.display = "initial";
    modal.innerHTML = texto;
    setTimeout(()=>{
        modal.style.display = "none";
    }, 1000);
}

function dadosexistentes() {
    dados = JSON.parse(localStorage.getItem('dados'));
    lista.firstElementChild.innerHTML = "<i class='material-icons'>fiber_manual_record</i> Meus Itens";
}

function novoitem() {
    verdadeiralista.innerHTML = "";
    var numerodeitensnalista = 0;
    dadosexistentes();
    dados.some(element => {
        numerodeitensnalista++;
        if(numerodeitensnalista>5){
            verdadeiralista.innerHTML += `<li class="collection-item"><a>...</a></li>`;
            return true;
        }
        verdadeiralista.innerHTML += `<li class="collection-item"><a>${element.nome}</a></li>`;
    });
}
function mostrarlista(element) {
    if (numitem == 0) {
        mensagem('não há nenhum item na sua lista');
    } else {
        verdadeiralista.style.visibility = "visible";
        novoitem();
        setTimeout(()=> {
            document.addEventListener("click", esconderlista);
            lista.removeEventListener("click", mostrarlista);
        }, 100);
    }
}
function esconderlista(element) {
    if(!element.target.classList.contains('lista-de-desejos') && !element.target.classList.contains('btnadd')){
        verdadeiralista.style.visibility = "hidden";
        setTimeout(()=> {
            lista.addEventListener("click", mostrarlista);
            document.removeEventListener("click", esconderlista);
        }, 100);
    }
}