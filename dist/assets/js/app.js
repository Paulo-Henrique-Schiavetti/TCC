window.onload = () => {
    let content = document.querySelector("#content");
    let navbar = document.querySelector("#navbar");
    let modal = document.querySelector("#modal");
    let searchinput = document.querySelector("#searchinput");
    let searchbar = document.querySelector("#searchbar");
    dropdown = document.createElement("ul");
    dropdown.setAttribute("class", "autocomplete");
    needAppendDropdown = true;
    options = document.createElement("ul");
    options.setAttribute("class", "perfil-options");
    needAppendPerfil = true;
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
                if (element.locatario == usuario.id) {
                    paginaitemlocatario(element.id, element.item, element.descrição, element.avaliacao, element.preço, element.endereco, element.imagemCompleta, element.nome, element.imagemMenor);
                } else {
                    paginaitem(element.id, element.item, element.descrição, element.avaliacao, element.preço, element.endereco, element.imagemCompleta, element.nome, element.imagemMenor);
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
function exibirchat(id) {
    let chatbox = document.querySelector("#chatbox");
    chatbox.innerHTML = `
    <h3 class=" text-center">Chat</h3>
    <div class="messaging">
    <div class="inbox_msg">
    <div class="inbox_people">
    <div class="headind_srch">
    <div class="recent_heading">
    <h4>Recent</h4>
    </div>
    <div class="srch_bar">
    <div class="stylish-input-group">
    <input type="text" class="search-bar"  placeholder="Search" >
    <span class="input-group-addon">
    <button type="button"> <i class="fa fa-search" aria-hidden="true"></i> </button>
    </span> </div>
    </div>
    </div>
    <div class="inbox_chat" id="inboxchat">

    </div>
    </div>
    </div>
        `;
    let inboxchat = document.querySelector("#inboxchat");
    axios
        .get(`/exibirchat/${id}`)
        .then(response => {
            response.data.forEach(element => {
                div = document.createElement("div");
                div.setAttribute("class", "chat_list");
                div.innerHTML = `
                <div class="chat_people">
                <div class="chat_img"> <img src="${element.imagemMenor}" alt="sunil"> </div>
                <div class="chat_ib">
                <h5>${element.nome} <span class="chat_date">Dec 25</span></h5>
                </div>
                </div>
                `;
                inboxchat.appendChild(div);
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