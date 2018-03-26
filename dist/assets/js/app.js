window.onload = () => {
    let grid = document.querySelector("#grid");
    let lista = document.querySelector("#lista");
    dados = [];
    localStorage.getItem('dados') ? dados = JSON.parse(localStorage.getItem('dados')) : localStorage.setItem('dados', "");
    localStorage.getItem('numitem') ? "" : localStorage.setItem('numitem', 0);
    numitem = parseInt(localStorage.getItem('numitem'));
    localStorage.getItem('dados') ? novoitem() : "";
    exibiritens();
    setTimeout(() => {
        grid.addEventListener("click", clicaritem);
        lista.addEventListener("click", mostrarlista);
    }, 500);
};

function item(id, nome, imagem) {
    return `
    <div class="col s12 m4" data-id="${id}">
        <div class="card">
            <div class="card-image">
                <img src="assets/imagens/bola-de-futebol-pequena-de-pelucia-pelucia.jpg" alt=""/>
                <span class="card-title"></span>
                <div>
                    <a class="waves-effect waves-light btn btnalugar">Alugar</a>
                    <a class="waves-effect waves-light btn btnadd">Add à lista</a>
                    <p class="descricao">${nome}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}

function novoitem() {
    lista.innerHTML = "<i class='material-icons'>reorder</i><h3 class='center'>!</h3>";
}

function clicaritem(element){
    // pegando o id do elemento
    const id = element.path[4].dataset.id;
    // escolhendo entre alugar e adicionar
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
                novoitem();
                dados[numitem] = response.data;
                numitem ++;
                localStorage.setItem("numitem", numitem);
                localStorage.setItem('dados', JSON.stringify(dados));
        });
}

function mostrarlista() {
    const dados = JSON.parse(localStorage.getItem('dados'));
    dados.forEach(element => {
        lista.innerHTML += `<li>${element.nome}</li>`;
    });
}

function exibiritens() {
    axios
    .get("/itens")
    .then(response => {
        response.data.forEach(element => {
            let card = item(element.id, element.nome, element.imagem);
            grid.innerHTML += card;
        });
    })
    .catch(error => {

    });
}