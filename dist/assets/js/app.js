window.onload = () => {
    //let button = document.querySelector("#send");
    //button.addEventListener("click", save);
    //read();
    let grid = document.querySelector("#grid");
    let lista = document.querySelector("#lista")
    exibiritems();
    setTimeout(() => {
        grid.addEventListener("click", clicar);
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

function clicar(element){
    console.log(element);
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
                lista.innerHTML += "<li><a href='item/"+id+"'>"+response.data.nome+"</a></li>";
        });
}

function exibiritems() {
    axios
    .get("/items")
    .then(response => {
        response.data.forEach(element => {
            let card = item(element.id, element.nome, element.imagem);
            grid.innerHTML += card;
        });
    })
    .catch(error => {

    });
}
function read() {
    axios
    .get("/all")
    .then(response => {
        response.data.forEach(element => {
            let card = item(element.address, element.image);
            grid.innerHTML += card;
        });
    })
    .catch(error => {

    });
}

function save() {
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

        const spinner = document.querySelector("#spinner");
        spinner.classList.add("is-active");

        axios
            .post("/geocode",{ lat, lng })
            .then(function(response) {
                let card = templateCard(response.data.address, response.data.image);
                grid.innerHTML += card;
                spinner.classList.remove("is-active");

            })
            .catch(function(error) {
                spinner.classList.remove("is-active");

            });
    }

    function error(error) {
        alert(error);
    }
}