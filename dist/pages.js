function paginahome(){
    content.innerHTML =`
    <div id="demo" class="carousel slide space-down" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
        </ul>
    
        <!-- The slideshow -->
        <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="assets/imagens/carousel1.jpeg" alt="1">
        </div>
        <div class="carousel-item">
            <img src="assets/imagens/carousel2.jpeg" alt="2">
        </div>
        <div class="carousel-item">
            <img src="assets/imagens/carousel3.jpeg" alt="3">
        </div>
        </div>
    
        <!-- Left and right controls -->
        <a class="carousel-control-prev" href="#demo" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="carousel-control-next" href="#demo" data-slide="next">
        <span class="carousel-control-next-icon"></span>
        </a>
    </div>
    <br/>
    <div class="col-lg-9 container"> 
        <div class="row" id="grid">
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
function menuLogado(){
    navbar.innerHTML = `
    <li class="nav-item active perfil" id="perfil">
    <img src="${usuario.imagemMenor}" alt="" class="perfil-icon"/><a class="nav-link" onclick="abrirPerfil()">${usuario.nome}</a>
    </li>
    <li class="nav-item active">
      <a class="nav-link" onclick="paginasobre()">Sobre</a>
    </li>
    `;
    let perfil = document.querySelector("#perfil");
    options.innerHTML = `
    <li class="autocomplete-item">
        <a onclick="paginacadastrarproduto()">Cadastrar Item</a>
    </li>
    <li class="autocomplete-item">
        <a onclick="logoff()">Sair</a>
    </li>
    `;
}
function item(id, locatario, nome, preco, descricao, imagem, endereco) {
    grid.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4" data-id="${id}">
      <div class="card h-100" onclick="alugar(${id})">
        <img class="card-img-top" src="${imagem}" height="220px" alt="">
        <div class="card-body">
          <h4 class="card-title">
            ${nome}
          </h4>
          <h5>R$ ${preco}</h5>
          <p class="card-text">${endereco}</p>
        </div>
      </div>
    </div>
    `;
}
function paginacadastrarproduto() {
    content.innerHTML = `
    <div class="container space-up form-box">
    <br/>
        <form class="form-group">
            <input type="text" class="form-control" id="camponome" placeholder="Nome"/>
        </form> <br/>
        <form class="form-group">
        <input type="text" class="form-control" id="campopreço" placeholder="Preço"/>
        </form> <br/>
        <form class="form-group">
        <input type="text" class="form-control" id="campodescricao" placeholder="Descrição"/>
        </form> <br/>
        <input type="file" id="campoimagem"/>
        <button class="btn btn-primary btn-right" onclick="cadastrarproduto()">Cadastrar</button> <br/><br/>
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
    <div class="container space-up form-box">
    <form class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" class="form-control" id="campoemail"/>
        </form>
        <form class="form-group">
            <label for="password">Senha:</label>
            <input type="password" class="form-control" id="camposenha"/>
        </form>
        <form class="form-group">
            <label for="text">Nome:</label>
            <input type="text" class="form-control" id="camponome"/>
        </form>
        <form class="form-group">
            <label for="phonenum">Telefone:</label>
            <input type="tel" class="form-control" id="campotelefone""/>
        </form>
        <div class="checkbox">
            <label><input type="checkbox"> obter localização atual.</label>
            <button class="btn btn-default btn-right">selecionar a localização</button>
        </div>
        <div class="checkbox">
            <label><input type="checkbox">lí e concordo com os <a href="">termos de uso</a>.</label>
        </div>
        <input type="file" id="campoimagem"/>
        <!--<img src="assets/imagens/bola.jpg" onclick="file.click();" width="100px"/>-->
        <button class="btn btn-default btn-right" onclick="cadastrarusuario()">Cadastrar</button> <br/><br/>
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
    <div class="col-lg-11 space-up">
        <div class="center-align">
                <img src="assets/imagens/icone-usuario.png" class="img-rounded">
        </div>
        <p class="center-align">
            Olá! Digite o seu E-mail
        </p>
        <div class="container form-box">
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
    <div class="col-lg-11 space-up">
        <div class="center-align">
            <img src="assets/imagens/icone-usuario.png" class="img-rounded" id="icone">
        </div>
        <p class="center-align">
        Agora digite a sua senha
        </p>
        <div class="container form-box">
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
    <div class="container space-up">
        <div class="row box">
            <div class="col-md-8 center-align">
            <img class="img-fluid item-img" src="${imagem}" alt="">
            </div>
            <div class="col-md-4 right-box">
            <h1 class="my-4">
            ${item}
            </h1>
            <h3 class="my-3">Descrição</h3>
            <p>${descricao}</p>
            <p>Preço: ${preco}, Endereço: ${endereco}, avaliação: ${avaliacao}</p>
            </div>
        </div>
    </div>
    `;
    exibircomentarios();
}
function paginasobre(){
    content.innerHTML = `
    <div class="container">
      <!-- Team Members Row -->
      <div class="row">
        <div class="col-lg-12">
          <h2 class="my-4 center-align">Nossa Equipe</h2>
        </div>
        <br/><br>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">
          <h3>Rafael Sousa
          </h3>
          <i>Gerente</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">
          <h3>Paulo Schiavetti
          </h3>
          <i>Programador Back-End</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">
          <h3>Gabriel Lopes
          </h3>
          <i>Programador Front-End</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">
          <h3>Larissa Adriana
          </h3>
          <i>Documentação</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">
          <h3>Liandra Manara
          </h3>
          <i>Documentação</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="http://placehold.it/200x200" alt="">
          <h3>Igor Teruel
          </h3>
          <i>Banco de Dados</i>
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="col-lg-12">
          <h2 class="my-4 center-align">Apoiadores</h2>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4 zoom">
          <a href="https://www.nutrire.ind.br/produtos/birbo-premium" target="_blank"><img class="img-fluid d-block mx-auto" width="200px" src="assets/imagens/birbo.png" alt=""></a>
          <i>A linha Birbo Premium foi desenvolvida para proporcionar uma alimentação completa e balanceada para cães, com ingredientes selecionados, proteínas de origem animal e vegetal, enriquecida com vitaminas e minerais que garantem uma alimentação balanceada e adequada para as necessidades dos animais de estimação. Os produtos Birbo para cães possuem extrato de Yucca Schidigera que atua a nível intestinal, propiciando melhor absorção de nutrientes e diminuindo o odor das fezes.
          </i>
        </div>
          <div class="col-lg-4 col-sm-6 text-center mb-4 zoom">
          <a href="https://www.nutrire.ind.br/produtos/monello-dog" target="_blank"><img class="img-fluid d-block mx-auto" width="200px" src="assets/imagens/monello.png" alt=""></a>
        <i>Monello Dog é uma linha premium especial que proporciona nutrição saudável e saborosa para cada fase da vida dos cães. Compõem a linha Monello Dog os produtos: Monello Dog Filhotes, Monello Dog Raças Pequenas e Monello Dog Tradicional. Todos são compostos por ingredientes selecionados que proporcionam melhor absorção e aproveitamento, diminuindo o volume das fezes e contam com a adição de Yucca Schidigera, que auxilia na redução do odor. </i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4 zoom">
          <a href="http://www.plenitudelogistica.com.br/" target="_blank"><img class="img-fluid d-block mx-auto" width="200px" src="assets/imagens/plenitude.png" alt=""></a>
        <i>A Plenitude Logística visa alcançar uma posição de destaque no segmento, atuando de forma ética e transparente, estabelecendo parcerias de resultados e viabilizando negócios para obter a fidelização de nossos clientes.</i>    
      </div>
    </div>
    <div class="row center-page">
        <div class="col-lg-12">
            <h2 class="my-4 center-align">Fale Conosco</h2>
        </div>
        <div class="col-lg-6 text-center">
            <div class="form-group">
                <input type="text" id="name" class="form-control" placeholder="Nome">
            </div>
            <div class="form-group">
                <input type="email" id="email" class="form-control" placeholder="Email">
            </div>
            <div class="textarea-message form-group">
                <textarea id="message" class="textarea-message form-control" placeholder="Digite sua mensagem..." rows="5"></textarea>
            </div>
            <button type="button" class="btn btn-default">Enviar</button>
        </div>
    </div>
    `;
}
function paginapesquisa(){
  content.innerHTML =`
    <div class="container space-up">
        <div class="col-lg-12"> 
            <div class="row" id="grid">
            </div>
        </div>
    </div>
    `;
  let grid = document.querySelector("#grid");
  exibirresultados();
}