window.onload = () => {
    let grid = document.querySelector("#grid");
    let lista = document.querySelector("#lista");
    let verdadeiralista = document.querySelector("#verdadeiralista");
    let pesquisar = document.querySelector("#pesquisar");
    //variáveis
    dados = [];
    localStorage.getItem('numitem') ? "" : localStorage.setItem('numitem', 0);
    numitem = parseInt(localStorage.getItem('numitem'));
    localStorage.getItem('dados') ? dadosexistentes() : localStorage.setItem('dados', "");
    //funções
    exibiritens();
    setTimeout(() => {
        grid.addEventListener("click", clicaritem);
        lista.addEventListener("click", mostrarlista);
        pesquisar.addEventListener("keyup", pesquisa);
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

function clicaritem(element){

    element.path[5].dataset.id ? id = element.path[5].dataset.id : id = element.path[4].dataset.id;

    if(element.path[1].classList.contains('btnalugar') || element.path[0].classList.contains('btnalugar')){
        alugar(id);
    } else if(element.path[1].classList.contains('btnadd') || element.path[0].classList.contains('btnadd')) {
        add(id);
    }
}

function alugar(id) {
    axios
        .get(`/pesquisarid/${id}`)
        .then(response => {
                alert(response.data.nome);
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

function item(id, locatario, nome, descricao, imagem, estrelas) {
    return `
    <div class="col s12 m4" data-id="${id}">
        <div class="card">
            <div class="card-image">
                <img src="${imagem}" alt=""/>
                <div class="card-content">
                    ${nome}
                    <div class="card-botoes">
                        <a class="btn btnalugar">Allugar</a>
                        <a class="btn btnadd"><i class="material-icons">add_circle_outline</i></a>
                    </div>
                    <div class="card-down">
                        ${estrelas}
                        <i class="material-icons">location_on</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function exibiritens() {
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
                let card = item(element.id, element.locatario, element.nome, element.descrição, element.imagem, estrelas);
                grid.innerHTML += card;
        });
    })
    .catch(error => {

    });
}

function pesquisa() {
    nome = pesquisar.value;
    axios
        .get(`/pesquisarnome/${nome}`)
        .then(response => {
            response.data.forEach(element => {
                console.log(element.nome);
            });
        });
}

function mensagem(texto) {
    alert(texto);
}
