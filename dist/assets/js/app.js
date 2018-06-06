window.onload = () => {
    let content = document.querySelector("#content");
    let lista = document.querySelector("#lista");
    let pesquisar = document.querySelector("#pesquisar");
    let dropdown = document.querySelector("#dropdown");
    let verdadeiralista = document.querySelector("#verdadeiralista");
    //variáveis
    dados = [];
    localStorage.getItem('numitem') ? "" : localStorage.setItem('numitem', 0);
    numitem = parseInt(localStorage.getItem('numitem'));
    localStorage.getItem('dados') ? dadosexistentes() : localStorage.setItem('dados', "");
    //funções
    exibiritens();
    setTimeout(() => {
        content.addEventListener("click", clicaritem);
        pesquisar.addEventListener("keyup", pesquisa);
        lista.addEventListener("click", mostrarlista);
    }, 500);
};

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
    console.log(element);
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
function item(id, locatario, nome, preco, descricao, imagem, estrelas) {
    return `
    <div class="col s12 m4" data-id="${id}">
        <div class="card">
            <div class="card-image">
                <img src="${imagem}" alt=""/>
                <div class="card-content">
                <div class="card-nome">
                    ${nome}
                    </div>
                    <div class="card-botoes">
                        <a class="btn btnalugar">Allugar</a>
                        <a class="btn btnadd"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-down">
                        ${estrelas}  R$${preco}
                    </div>
                    <div class="card-quase-down">
                    <i class="material-icons">location_on</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
function exibiritens() {
    content.innerHTML = "";
    axios
    .get("/itens")
    .then(response => {
        response.data.forEach(element => {
            var estrelas = '';
            for(i=0;i<5;i++){
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
                item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagem, estrelas);
        });
    })
    .catch(error => {

    });
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
    axios
        .get(`/paginaitem/${id}`)
        .then(response => {
            element = response.data;
            axios
                .get(`/conversa/${id}`)
                .then(response => {
                    response.data.forEach(chat => {
                        comentarios += '<p>'+chat.nome+': '+chat.mensagem+'</p>';
                        paginaitem(element.id, element.nome, element.locatario, element.imagem, comentarios);
                    });
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
            mensagem('O item foi adicionado a lista ->');
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
                    dropdown.innerHTML += `<li class="dropdown-li"><a>...</a></li>`;
                    return true;
                }
            dropdown.innerHTML += `<li class="dropdown-li"><a><img src="${element.imagem}" alt="">${element.nome}</a></li>`;
            })
        });
}

function mensagem(texto) {
    alert(texto);
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