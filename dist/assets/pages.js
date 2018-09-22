function paginahome(){
    content.innerHTML =`
      <div class="col-lg-11">
        <br><br><br>
        <div class="row" id="grid">
        </div>
      </div>
      <div onclick='exibiritens()'>
        <a class="btn">Ver Mais</a>
      </div>
    `;
    let grid = document.querySelector("#grid");
    page = 0;
    exibiritens();
}

function item(id, locatario, nome, preco, descricao, imagem, endereco, estrelas) {
    grid.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4" data-id="${id}>
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="${imagem}" alt=""></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">${nome}</a>
          </h4>
          <h5>R$ ${preco}</h5>
          <p class="card-text">${endereco}</p>
        </div>
        <div class="card-footer">
          ${estrelas}
        </div>
      </div>
    </div>
    `;
}
function paginacadastrarproduto() {
    content.innerHTML = `
    <div class="container">
        <ul class="center-align">
            <form class="camponome">
                <input type="text" id="nome" placeholder="Nome"/>
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
        <form class="btn btncadastro"
            <button onclick="cadastrarusuario()">Cadastrar</button>
        </form>
    </div>
    `;
}
function paginalogar() {
    content.innerHTML = `
    <div class="container">
        <ul class="center-align">
        <form class="emaillogin">
            <input type="text" id="email" placeholder="Email"/>
        </form> <br/>
        <form class="senhalogin">
            <input type="password" id="senha" placeholder="Senha"/>
        </form> <br/>
        <form class="btn btnlogin"
            <button onclick="validacao()">login</button>
        </form>
        </ul>
    </div>
    `;
}
function paginaitem(id, item, endereco, imagem) {
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