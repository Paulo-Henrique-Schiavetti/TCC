window.onload = () => {
    let content = document.querySelector("#content");
    let navbar = document.querySelector("#navbar");
    let searchinput = document.querySelector("#searchinput");
    let searchbar = document.querySelector("#searchbar");
    dropdown = document.createElement("ul");
    dropdown.setAttribute("class", "autocomplete");
    needAppendDropdown = true;
    options = document.createElement("ul");
    options.setAttribute("class", "perfil-options");
    needAppendPerfil = true;
    listadropdown = document.createElement("ul");
    listadropdown.setAttribute("class", "perfil-options");
    needAppendLista = true;
    modal = document.createElement("div");
    modal.setAttribute("class", "container mensagem");

    //variáveis
    usuario = [];
    loged = false;
    localStorage.getItem('usuario') ? loged=true : "";
    loged ? usuario=JSON.parse(localStorage.getItem('usuario')) : "";
    usuariolocatario = false;
    
    //funções
    setTimeout(() => {

        paginahome();
        loged ? menuLogado() : "";
        searchbar.addEventListener("keyup", autocomplete);
        document.addEventListener("click", cancelEvents);
    
    }, 100);
        
};
function exibiritens() {
    axios
    .get(`/itens/${page}`)
    .then(response => {
        response.data.forEach((element) => {
            item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagemMenor, element.endereco);
        });
        if (response.data.length<9) {
            vermais.remove();
        }
    });
    page += 9;
}
function exibirresultados(){
    var texto = searchinput.value;
    axios
    .get(`/pesquisarparapagina/${texto}`)
    .then(response => {
        response.data.forEach((element) => {
            item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagemMenor, element.endereco);
        });
    });
}
function exibirmeusitens(){
    var id = usuario.id;
    axios
    .get(`/meusitens/${id}`)
    .then(response => {
        response.data.forEach((element) => {
            item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagemMenor, element.endereco);
        });
    grid.innerHTML += `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 add-item" onclick="paginacadastrarproduto()">
            <i class="fa fa-plus-circle card-img-top"></i>
            <div class="card-body center-align">
            <h4 class="card-title">
            Cadastrar item
            </h4>
            </div>
        </div>
        </div>
        `;
    });
}
function alugar(id) {
        axios
            .get(`/pesquisarid/${id}`)
            .then(response => {
                element = response.data;
                if (element.locatario == usuario.id) {
                    paginaitemlocatario(element.id, element.item, element.descrição, element.avaliacao, element.preço, element.endereco, element.imagemCompleta, element.nome, element.imagemMenor);
                } else {
                    paginaitem(element.id, element.item, element.locatario, element.descrição, element.avaliacao, element.preço, element.endereco, element.imagemCompleta, element.nome, element.imagemMenor);
                }
            });
}
function cancelEvents(element) {
    if (element.target.id != "searchinput" && needAppendDropdown != true) {
        searchbar.removeChild(dropdown);
        searchinput.style.borderBottomLeftRadius = '4px';
        searchinput.style.borderBottomRightRadius = '4px';
        needAppendDropdown = true;
    }
    if (element.target.parentNode.id != "perfil" && needAppendPerfil != true) {
        perfil.removeChild(options);
        needAppendPerfil = true;
    }
    if (needAppendLista != true) {
        favoritos.removeChild(listadropdown);
        needAppendLista = true;
    }
}
function abrirPerfil() {
    if(needAppendPerfil) {
        perfil.appendChild(options);
        needAppendPerfil = false;
    } else {
        perfil.removeChild(options);
        needAppendPerfil = true;
    }
}
function autocomplete() {
    nome = searchinput.value;
    
    axios
        .get(`/pesquisarnome/${nome}`)
        .then(response => {
            if (nome == "" || response.data.length == 0) {
                if (!needAppendDropdown) {
                searchbar.removeChild(dropdown);
                searchinput.style.borderBottomLeftRadius = '4px';
                searchinput.style.borderBottomRightRadius = '4px';
                needAppendDropdown = true;
                }
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
                dropdown.innerHTML += `<li class="autocomplete-item" onclick="alugar(${element.id})"><a><img class="autocomplete-icon" src="${element.imagemMenor}" alt=""> ${nomeAbreviado}</a></li>`;
            })
            if (response.data.length == 4) {
                    dropdown.innerHTML += `<li class="autocomplete-item" onclick="paginapesquisa();"><a>...</a></li>`;
                }
            if (needAppendDropdown){
                searchbar.appendChild(dropdown);
                searchinput.style.borderBottomLeftRadius = 0;
                searchinput.style.borderBottomRightRadius = 0;
                needAppendDropdown = false;
            }
        });
}

function adicionaralista(id, element) {
    element.children[0].setAttribute('class', 'fa fa-star permanente');
    element.children[0].setAttribute('onmouseover', '');
    element.children[0].setAttribute('onmouseout', '');
    element.setAttribute('onclick', '');
    axios
        .post(`/inserirnalista`, {item_id: id, usuarios_id: usuario.id})
        .then(()=> {
            mensagemtemporaria('O item foi adicionado aos favoritos!')
        })
        .catch(error => {
            console.log(error);
        })
}
function abrirfavoritos() {
    id = usuario.id;
    if (needAppendLista){
    axios
        .get(`/abrirlista/${id}`)
        .then(response => {
            if (response.data.length == 0) {
                mensagemtemporaria('Você não tem nenhum item nos seus favoritos.')
                return;
            }
            listadropdown.innerHTML = "";
            response.data.forEach(element => {
                nomeArray = element.nome.split("");
                if (nomeArray.length > 6){
                    nomeArray.length = 4;
                    nomeAbreviado = nomeArray.join("")+"...";
                } else {
                    nomeAbreviado = element.nome;
                }
                listadropdown.innerHTML += `<li class="perfil-item" onclick="alugar(${element.id})"><a><img class="autocomplete-icon" src="${element.imagemMenor}" alt=""> ${nomeAbreviado}</a></li>`;
            })
            if (response.data.length == 4) {
                    listadropdown.innerHTML += `<li class="perfil-item" onclick="paginafavoritos(${id});"><a>...</a></li>`;
                }
            
                favoritos.appendChild(listadropdown);
                needAppendLista = false;
        });
    }
}

function exibirfavoritos(){
    axios
    .get(`/abrirlistacompleta/${usuario.id}`)
        .then(response => {
            response.data.forEach((element) => {
                item(element.id, element.locatario, element.nome, element.preço, element.descrição, element.imagemMenor, element.endereco);
            });
        })
}
function deleteitem(id) {
    axios
    .get(`/deleteitem/${id}`)
    .then(response => {
        paginahome();
        mensagemtemporaria("seu item foi excluido!");
    })
}
function mensagemtemporaria(texto) {
    modal.innerHTML = texto;
    content.appendChild(modal);
    setTimeout(() => {
        content.removeChild(modal);
    }, 1500);
}