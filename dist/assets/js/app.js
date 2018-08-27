window.onload = () => {
    let content = document.querySelector("#content");
    let headertop = document.querySelector("#headertop");
    let headerbase = document.querySelector("#headertop");
    let lista = document.querySelector("#lista");
    let verdadeiralista = document.querySelector("#verdadeiralista");
    let modal = document.querySelector("#modal");

    //variáveis
    loged = false;
    localStorage.getItem('usuario') ? loged=true : "";
    loged ? usuario=JSON.parse(localStorage.getItem('usuario')) : "";
    page = 0;

    //funções
    setTimeout(() => {
        paginahome();
    }, 100);
        
};

function exibiritens() {
    axios
    .get(`/itens/${page}`)
    .then(response => {
        response.data.forEach((element) => {
            var estrelas = '';
            for (e = 0; e < 5; e++) {
                if (element.avaliacao >= 1) {
                    estrelas += '<i class="material-icons">star</i>'
                } else {
                    if (element.avaliacao > 0) {
                        estrelas += '<i class="material-icons">star_half</i>'
                    } else {
                        estrelas += '<i class="material-icons">star_border</i>'
                    }
                }
                element.avaliacao -= 1;
            }
            item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagem, element.endereco, estrelas);
        });
    });
    page += 9;
}
function exibirresultados(texto){
    axios
    .get(`/pesquisarparapagina/${texto}`)
    .then(response => {
        response.data.forEach((element) => {
            var estrelas = '';
            for (e = 0; e < 5; e++) {
                if (element.avaliacao >= 1) {
                    estrelas += '<i class="material-icons">star</i>'
                } else {
                    if (element.avaliacao > 0) {
                        estrelas += '<i class="material-icons">star_half</i>'
                    } else {
                        estrelas += '<i class="material-icons">star_border</i>'
                    }
                }
                element.avaliacao -= 1;
            }
            resultados(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagem, element.endereco, estrelas);
        });
    });
}
/*
// codigo inútil?
function clicaritem(element) {

    element.path[5].dataset.id ? id = element.path[5].dataset.id : id = element.path[4].dataset.id;

    if (element.path[1].classList.contains('btnalugar') || element.path[0].classList.contains('btnalugar')) {
        alugar(id);
    } else if (element.path[1].classList.contains('btnadd') || element.path[0].classList.contains('btnadd')) {
        add(id);
    }
}
*/
function alugar(id) {
    var comentarios = "";
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
                campocomments.innerHTML += '<p>' + comments.nome + ': ' + comments.mensagem + '</p>';
            });
        });
}
function pesquisa() {
    nome = pesquisar.value;
    dropdown.innerHTML = "";

    axios
        .get(`/pesquisarnome/${nome}`)
        .then(response => {
            if (nome == "" || response.data.length == 0) {
                pesquisar.style = "border-radius: 50px";
                return;

            } else {
                pesquisar.style = "border-top-right-radius: 30px; border-top-left-radius: 30px;border-bottom-right-radius: 0; border-bottom-left-radius: 0";
            }
            response.data.forEach(element => {
                nomeArray = element.nome.split("");
                if (nomeArray.length > 28){
                    nomeArray.length = 28;
                    nomeAbreviado = nomeArray.join("")+"...";
                } else {
                    nomeAbreviado = element.nome;
                }
                dropdown.innerHTML += `<li class="dropdown-li"><a onclick="alugar(${element.id})"><img src="${element.imagem}" alt=""><span>${nomeAbreviado}</span></a></li>`;
            })
            if (response.data.length == 4) {
                    dropdown.innerHTML += `<li class="dropdown-li tres-pontos"><a>...</a></li>`;
                }
        });
}

function mensagem(texto) {
    modal.style.display = "block";
    modal.innerHTML = texto;
}

function mensagemtemporaria(texto) {
    modal.style.display = "initial";
    modal.innerHTML = texto;
    setTimeout(() => {
        modal.style.display = "none";
    }, 1000);
}
// lista de desejos
function add(id) {
    axios
        .post(`/inserirnalista`, {item_id: id, usuarios_id: usuario.id})
        .then(()=> {
            mensagemtemporaria('O item foi adicionado a lista!')
        })
        .catch(error => {
            console.log(error);
        })
}
function mostrarlista() {
    verdadeiralista.innerHTML = "";
    axios
        .get(`/abrirlista/${usuario.id}`)
        .then(response => {
            response.data.forEach(element=>{
                verdadeiralista.innerHTML += `<li class="collection-item" onclick="alugar(${element.id})"><a>${element.nome}</a></li>`;
                verdadeiralista.style.visibility = "visible";
            })
        })
        setTimeout(() => {
            document.addEventListener("click", esconderlista);
            lista.removeEventListener("click", mostrarlista);
        }, 100);
}
function esconderlista(element) {
        verdadeiralista.style.visibility = "hidden";
        setTimeout(() => {
            lista.addEventListener("click", mostrarlista);
            document.removeEventListener("click", esconderlista);
        }, 100);
}