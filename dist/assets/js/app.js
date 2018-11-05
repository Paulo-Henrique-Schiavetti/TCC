window.onload = () => {
    let content = document.querySelector("#content");
    let navbar = document.querySelector("#navbar");
    let modal = document.querySelector("#modal");
    let searchinput = document.querySelector("#searchinput");
    let searchbar = document.querySelector("#searchbar");
    dropdown = document.createElement("ul");
    dropdown.setAttribute("class", "autocomplete");
    needAppendDropdown = true;
    // lista
    //let lista = document.querySelector("#lista");
    //let verdadeiralista = document.querySelector("#verdadeiralista");

    //variáveis
    usuario = [];
    loged = false;
    localStorage.getItem('usuario') ? loged=true : "";
    loged ? usuario=JSON.parse(localStorage.getItem('usuario')) : "";
    
    //funções
    setTimeout(() => {

        paginahome();
        loged ? menuLogado() : "";
        document.addEventListener("keyup", autocomplete);
    
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
                    estrelas += '<i class="fa fa-star" style="color:rgb(243, 239, 29);"></i>'
                } else {
                    if (element.avaliacao > 0) {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    } else {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    }
                }
                element.avaliacao -= 1;
            }
            item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagemMenor, element.endereco, estrelas);
        });
        if (response.data.length<9) {
            vermais.remove();
        }
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
                    estrelas += '<i class="fa fa-star" style="color:rgb(243, 239, 29);"></i>'
                } else {
                    if (element.avaliacao > 0) {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    } else {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    }
                }
                element.avaliacao -= 1;
            }
            resultados(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagemMenor, element.endereco, estrelas);
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
        axios
            .get(`/pesquisarid/${id}`)
            .then(response => {
                element = response.data;
                console.log(element);
                paginaitem(element.id, element.item, element.descrição, element.avaliacao, element.preço, element.endereco, element.imagemCompleta, element.nome, element.imagemMenor);
                exibircomentarios(element.id);
            });
}
function exibircomentarios(id) {
    let campocomments = document.querySelector("#comentarios");
    axios
        .get(`/comentarios/${id}`)
        .then(response => {
            response.data.forEach(comments => {
                campocomments.innerHTML += '<p>' + comments.nome + ': ' + comments.mensagem + '</p>';
            });
        });
}
function autocomplete() {
    nome = searchinput.value;
    
    axios
        .get(`/pesquisarnome/${nome}`)
        .then(response => {
            if (nome == "" || response.data.length == 0) {
                searchbar.removeChild(dropdown);
                searchinput.style.borderBottomLeftRadius = '4px';
                searchinput.style.borderBottomRightRadius = '4px';
                needAppendDropdown = true;
                return;
            }
            dropdown.innerHTML = "";
            response.data.forEach(element => {
                nomeArray = element.nome.split("");
                if (nomeArray.length > 28){
                    nomeArray.length = 28;
                    nomeAbreviado = nomeArray.join("")+"...";
                } else {
                    nomeAbreviado = element.nome;
                }
                dropdown.innerHTML += `<li class="autocomplete-item"><a onclick="alugar(${element.id})"><img class="autocomplete-icon" src="${element.imagemMenor}" alt=""> ${nomeAbreviado}</a></li>`;
            })
            if (response.data.length == 4) {
                    dropdown.innerHTML += `<li class="autocomplete-item"><a>...</a></li>`;
                }
        });
        if (needAppendDropdown){
            searchbar.appendChild(dropdown);
            searchinput.style.borderBottomLeftRadius = 0;
            searchinput.style.borderBottomRightRadius = 0;
            needAppendDropdown = false;
        }
    
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
function clickimagem(){
    file.click();
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