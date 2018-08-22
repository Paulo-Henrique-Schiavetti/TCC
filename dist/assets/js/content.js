function paginahome(){
    header(true);
    content.innerHTML =`
    <div class="row" id="grid">
    </div>
    <div class="row">
        <div class="vermais" onclick='exibiritens()'>
            <a class="btn">Ver Mais</a>
        </div>
    </div>
    `;
    let grid = document.querySelector("#grid");
    page = 0;
    pronta = true;
    exibiritens();
}

function item(id, locatario, nome, preco, descricao, imagem, endereco, estrelas) {
    //abreviando endereço
    localArray = endereco.split("");
    localArray.length = 13;
    localAbreviado = localArray.join("")+"...";
    //abreviando nome
    nomeArray = nome.split("");
    if (nomeArray.length > 18){
        nomeArray.length = 18;
        nomeAbreviado = nomeArray.join("")+"...";
    } else {
        nomeAbreviado = nome;
    }
    grid.innerHTML += `
    <div class="col s12 m4" data-id="${id}">
        <div class="card">
            <div class="card-image">
                <img src="${imagem}" alt=""/>
                <div class="card-content">
                    <div class="card-nome" title="${nome}">${nomeAbreviado}</div>
                    <div class="card-all"><a class="btn btnalugar">Allugar</a></div>
                    <div class="card-add"><a class="btn btnadd"><i class="material-icons">shopping_cart</i></a></div>
                    <div class="card-livre"><p>LIVRE</p></div>
                    <div class="card-local"><div  title="${endereco}><i class="material-icons">location_on</i>${localAbreviado}</div></div><br/>
                    <div class="card-estrela">${estrelas}</div>
                    <div class="card-preco">R$${preco}</div>
                </div>
            </div>
        </div>
    </div>
    `;
}
function paginacadastrarproduto() {
    header();
    content.innerHTML = `
    <div class="container">
        <ul class="center-align">
            <form class="camponome">
                <input type="text" id="camponome" placeholder="Nome"/>
            </form> <br/>
            <form class="campopreço">
            <input type="text" id="campopreço" placeholder="Preço"/>
            </form> <br/>
            <form class="campodescriçao">
            <input type="text" id="campodescriçao" placeholder="Descrição"/>
            </form> <br/>
            <input type="file" id="campoimagem"/>
            <button onclick="cadastrarproduto()">Cadastrar</button>
        </ul>
    </div>
    `;
}
function paginacadastrarusuario() {
    header();
    content.innerHTML = `
    <div class="container">
        <form class="emailcadastro">
        <input type="text" id="campoemail" placeholder="Email"/>
        </form> <br/>
        <form class="senhacadastro">
            <input type="password" id="camposenha" placeholder="Senha"/>
        </form> <br/>
        <form class="nomeusuario">
            <input type="text" id="camponome" placeholder="Nome"/>
        </form> <br/>
        <form class="telefone">
            <input type="text" id="campotelefone" placeholder="(DDD)97070-7070"/>
        </form> <br/>
            <button class="btn btncadastro" onclick="cadastrarusuario()">Cadastrar</button>
    </div>
    `;
}
function paginalogar() {
    header();
    content.innerHTML = `
    <div class="container">
        <ul class="center-align">
        <form class="emaillogin">
            <input type="text" id="email" placeholder="Email"/>
        </form> <br/>
        <form class="senhalogin">
            <input type="password" id="senha" placeholder="Senha"/>
        </form> <br/>
            <button class="btn btnlogin" onclick="validacao()">login</button>
        </ul>
    </div>
    `;
}
function paginaitem(id, item, endereco, imagem) {
    header();
    content.innerHTML = `
    <div class="container">
        <ul class="center-align paginaitem">
            <p>${item}</p>
            <img src="${imagem}" alt=""/>
            <p>${endereco}</p>
            <div class="comentarios" id="comentarios">
            </div>
        </ul>
    </div>
    `;
    exibircomentarios();
}