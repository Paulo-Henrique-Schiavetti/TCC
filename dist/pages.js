function paginahome(){
    content.innerHTML =`
<<<<<<< HEAD
      <div class="col-lg-11">
        <div class="row" id="grid">
=======
    <div class="container">
        <div class="col-lg-12"> 
            <div class="row" id="grid">
            </div>
>>>>>>> b7c93a189e960d0fb13c1dcacd018dc2b172cd96
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
        <a><img class="card-img-top" src="${imagem}" height="200" alt=""></a>
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
    <div class="col-lg-11 center-page">
        <div class="img-login">
                <img src="assets/imagens/icone-usuario.png" width = "100px">
        </div>
        <p class="ola">
            Olá! Digite o seu E-mail
        </p>
        <br>
        <div class="login">
            <form>
                <br><br><br>
                <div class="form-group">
                    <label for="email">E-mail:</label>
                    <input type="email" class="form-control" id="email">
                </div>
                <div class="btn-continuar">
                <button type="button" class="btn btn-default" onclick="validacaoEmail()">Continuar</button>
                </div>
                <br>
                <div class="conta-nova">
                    <p>
                    Não tem uma conta? <a class="navbar-brand" href="index.html">Crie uma!</a>
                    </p>
                </div>
            </form>
            
        </div>
        <br><br><br><br><br><br><br>
    </div
    `;
}
function paginalogar2(email, nome) {
    content.innerHTML = `
    <div class="col-lg-11">
        <div class="img-login">
            <img src="assets/imagens/icone-usuario.png" id="icone" width = "100px">
        </div>
        <p class="agora">
        ${nome}<br/>
        Agora digite a sua senha
        </p>
        <br>
        <div class="login">
            <form>
            <br><br><br>
            <div class="form-group">
                    <label for="pwd">Senha:</label>
                    <input type="password" class="form-control" id="senha">
                </div>
                <div class="checkbox">
                    <label><input type="checkbox"> Mantenha-me conectado</label>
                </div>
                <div class="btn-entrar">
                <button type="button" class="btn btn-default" onclick="validacaoSenha('${email}')">Entrar</button>
                </div>
                <br><br><br>
            </form>
        </div>
      </div>
      `;
}
function paginaitem(id, item, endereco, imagem) {
    content.innerHTML = `
    <div class="container">
        <p>${item}</p>
        <img src="${imagem}" alt="" width="120px">
        <div id="comentarios">
        </div>
    </div>
    `;
    exibircomentarios();
}
function menuLogado(){
    navbar.innerHTML = `
    <li class="nav-item active">
        <a class="nav-link" onclick="paginacadastrarproduto()">Cadastrar Item</a>
    </li>
    `;
}