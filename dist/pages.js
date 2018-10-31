function paginahome(){
    content.innerHTML =`
    <div class="container">
        <div class="col-lg-12"> 
            <div class="row" id="grid">
            </div>
        </div>
    </div>
    <div class="container" id="vermais">
        <ul class="center-align">
            <button class="btn btn-default" onclick="exibiritens()">Ver Mais</button>
        </ul>
    </div>
    `;
    let grid = document.querySelector("#grid");
    let vermais = document.querySelector("#vermais");
    page = 0;
    exibiritens();
}

function item(id, locatario, nome, preco, descricao, imagem, endereco, estrelas) {
    grid.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4" data-id="${id}">
      <div class="card h-100" onclick="alugar(${id})">
        <a><img class="card-img-top" src="${imagem}" height="220px" alt=""></a>
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
                <input type="text" id="camponome" placeholder="Nome"/>
            </form> <br/>
            <form class="campopreço">
            <input type="text" id="campopreço" placeholder="Preço"/>
            </form> <br/>
            <form class="campodescriçao">
            <input type="text" id="campodescricao" placeholder="Descrição"/>
            </form> <br/>
            <input type="file" id="campoimagem"/>
            <button onclick="cadastrarproduto()">Cadastrar</button>
        </ul>
    </div>
    `;
    var camponome = document.querySelector('#camponome');
    var campopreço = document.querySelector('#campopreço');
    var campodescricao = document.querySelector('#campodescriçao');
    var file = document.querySelector('#campoimagem');
    file.addEventListener('change', prepararImagem);
}
function paginacadastrarusuario() {
    content.innerHTML = `
    <div class="container">
        <form class="form-group">
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
        <input type="file" id="campoimagem"/>
        <form class="btn btncadastro"
            <button onclick="cadastrarusuario()">Cadastrar</button>
        </form>
    </div>
    `;
    var campoemail = document.querySelector('#campoemail');
    var camposenha = document.querySelector('#camposenha');
    var camponome = document.querySelector('#camponome');
    var campotelefone = document.querySelector('#campotelefone');
    var file = document.querySelector('#campoimagem');
    file.addEventListener('change', prepararImagem);
}
function paginalogar() {
    content.innerHTML = `
    <div class="col-lg-11">
        <div class="center-align">
                <img src="assets/imagens/icone-usuario.png" class="img-rounded">
        </div>
        <p class="center-align">
            Olá! Digite o seu E-mail
        </p>
        <div class="container login">
            <form>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <button type="button" class="btn btn-default" onclick="validacaoEmail()">Continuar</button>
                <p>
                Não tem uma conta? <a class="navbar-brand" href="index.html">Crie uma!</a>
                </p>
            </form>
        </div>
    </div>
    `;
}
function paginalogar2(email, nome) {
    content.innerHTML = `
    <div class="col-lg-11">
        <div class="center-align">
            <img src="assets/imagens/icone-usuario.png" class="img-rounded" id="icone">
        </div>
        <p class="center-align">
        Agora digite a sua senha
        </p>
        <div class="container login">
            <form>
                <div class="form-group">
                        <label for="senha">Senha:</label>
                        <input type="password" class="form-control" id="senha">
                </div>
                <div class="checkbox">
                    <label><input type="checkbox"> Mantenha-me conectado</label>
                </div>
                <button type="button" class="btn btn-default" onclick="validacaoSenha('${email}')">Entrar</button>
                <p></p>
            </form>
        </div>
      </div>
      `;
}
function paginaitem(id, item, descricao, avaliacao, preco, endereco, imagem, locatario, locatarioImagem) {
    content.innerHTML = `
    <div class="container">
        <p>${item}</p>
        <img src="${imagem}" alt="" width="120px">
        <p>${descricao}. avaliação: ${avaliacao}, preço: ${preco}, endereço: ${endereco}.</p>
    </div>
    `;
    exibircomentarios();
}
function menuLogado(){
    navbar.innerHTML = `
    <li class="nav-item active">
        <a class="nav-link" onclick="paginacadastrarproduto()">Cadastrar Item</a>
    </li>
    <li class="nav-item active">
        <a class="nav-link" onclick="logoff()">sair</a>
    </li>
    `;
}