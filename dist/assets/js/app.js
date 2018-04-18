window.onload = () => {
    let grid = document.querySelector("#grid");
    let lista = document.querySelector("#lista");
    let verdadeiralista = document.querySelector("#verdadeiralista");
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
    }, 500);
};

function dadosexistentes() {
    dados = JSON.parse(localStorage.getItem('dados'));
    lista.innerHTML = "<p class='lista-titulo lista-titulo2'>lista de itens</p><h3 class='alert'>!</h3><ul class='collection' id='verdadeiralista'></ul>";
}

function novoitem() {
    verdadeiralista.innerHTML = "";
    var numerodeitensnalista = 0;
    dados.some(element => {
        numerodeitensnalista++;
        if(numerodeitensnalista>5){
            verdadeiralista.innerHTML += `<li class="collection-item"><a>...</a></li>`;
            return true;
        }
        verdadeiralista.innerHTML += `<li class="collection-item"><a>${element.nome}</a></li>`;
    });
}

function mostrarlista() {
    verdadeiralista.style.visibility = "visible";
    novoitem();
    if (numitem == 0) {
        mensagem('não há nenhum item na sua lista');
    } else {
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

    const id = element.path[4].dataset.id;

    if(element.target.classList.contains('btnalugar')){
        alugar(id);
    } else if(element.target.classList.contains('btnadd')) {
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
            mensagem('O item foi adicionado a lista ->');
            novoitem();
        });
}

function item(id, nome, descricao, imagem) {
    return `
    <div class="col s12 m4" data-id="${id}">
        <div class="card">
            <div class="card-image">
                <img src="${imagem}" alt=""/>
                <span class="card-title">${nome}</span>
                <div>
                    <a class="waves-effect waves-light btn btnalugar">Allugar</a>
                    <a class="waves-effect waves-light btn btnadd">Add à lista</a>
                    <p class="descricao">${descricao}</p>
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
                let card = item(element.id, element.nome, element.descrição, element.imagem);
                grid.innerHTML += card;
        });
    })
    .catch(error => {

    });
}

function mensagem(texto) {
    alert(texto);
}