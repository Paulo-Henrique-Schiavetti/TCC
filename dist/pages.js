function paginahome(){
    content.innerHTML =`
        <div id="demo" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ul class="carousel-indicators">
        <li data-target="#demo" data-slide-to="0" class="active"></li>
        <li data-target="#demo" data-slide-to="1"></li>
        <li data-target="#demo" data-slide-to="2"></li>
        </ul>
        <!-- The slideshow -->
        <div class="carousel-inner" onclick="paginacadastrarusuario()">
        <div class="carousel-item active">
            <img class="img-responsive" src="assets/imagens/carousel1.jpeg" alt="1">
        </div>
        <div class="carousel-item">
            <img class="img-responsive" src="assets/imagens/carousel2.jpeg" alt="2">
        </div>
        <div class="carousel-item">
            <img class="img-responsive" src="assets/imagens/carousel3.jpeg" alt="3">
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
    <div class="col-lg-10 container"> 
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
    <li class="nav-item active perfil" id="perfil" onclick="abrirPerfil()">
    <img src="${usuario.imagemMenor}" alt="" class="perfil-icon"/><a class="nav-link">${usuario.nome}</a>
    </li>
    <li class="nav-item active">
      <a class="nav-link" onclick="paginasobre()">Sobre</a>
    </li>
    `;
    let perfil = document.querySelector("#perfil");
    options.innerHTML = `
    <li class="perfil-item"  onclick="paginameusitens()">
        <a>Meus Itens</a>
    </li>
    <li class="perfil-item" onclick="paginacadastrarproduto()">
        <a>Cadastrar Item</a>
    </li>
    <li class="perfil-item" onclick="logoff()">
        <a>Sair</a>
    </li>
    `;
}
function item(id, locatario, nome, preco, descricao, imagem, endereco) {
    grid.innerHTML += `
    <div class="col-lg-4 col-md-6 mb-4" data-id="${id}">
      <div class="card h-100" onclick="alugar(${id})">
        <img class="card-img-top" src="${imagem}" height="300px" alt="">
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
    <div class="col-lg-5 space-up space-down">
        <div class="container form-box">
            <br/>
            <form action="javascript:void(0);" onsubmit="cadastrarproduto()">
            <div class="form-group">
                <input type="text" class="form-control" id="camponome" placeholder="Nome"/>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="campopreço" placeholder="Preço"/>
            </div>
            <div class="form-group">
            <input type="text" class="form-control" id="campodescricao" placeholder="Descrição"/>
            </div>
            <input type="file" id="campoimagem"/>
            <button type="submit" class="btn btn-primary btn-right">Cadastrar</button>
            </form> 
            <br/>
        </div>
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
    <div class="col-lg-5 space-up">
        <div class="container form-box">
            <br/>
            <form action="javascript:void(0);" onsubmit="cadastrarusuario()">
            <div class="form-group">
            <label for="email">E-mail:</label>
            <input type="email" class="form-control" id="campoemail"/>
            </div>
            <div class="form-group">
                <label for="password">Senha:</label>
                <input type="password" class="form-control" id="camposenha"/>
            </div>
            <div class="form-group">
                <label for="text">Nome:</label>
                <input type="text" class="form-control" id="camponome"/>
            </div>
            <div class="form-group">
                <label for="phonenum">Telefone:</label>
                <input type="tel" class="form-control" id="campotelefone""/>
            </div>
            <div class="checkbox" >
                <label><input type="checkbox" id="localcheck"> obter localização atual.</label>
                <!--<button class="btn btn-default btn-right">selecionar a localização</button>-->
            </div>
            <div class="checkbox">
                <label><input type="checkbox">lí e concordo com os <a href="">termos de uso</a>.</label>
            </div>
            <input type="file" id="campoimagem"/>
            <!--<img src="assets/imagens/bola.jpg" onclick="file.click();" width="100px"/>-->
            <button type="submit" class="btn btn-default btn-right">Cadastrar</button>
            </form>
            <br/>
        </div>
    </div>
    `;
    var campoemail = document.querySelector('#campoemail');
    var camposenha = document.querySelector('#camposenha');
    var camponome = document.querySelector('#camponome');
    var campotelefone = document.querySelector('#campotelefone');
    var localcheck = document.querySelector('#localcheck');
    var file = document.querySelector('#campoimagem');
    file.addEventListener('change', prepararImagem);
}
function paginalogar() {
    content.innerHTML = `
    <div class="col-lg-4 space-up space-down">
        <div class="center-align">
            <img src="assets/imagens/icone-usuario.png" class="img-rounded">
            <p>
                Olá! Digite o seu E-mail
            </p>
        </div>
        <div class="container form-box">
            <br/>
            <form action="javascript:void(0);" onsubmit="validacaoEmail()">
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" class="form-control" id="email">
            </div>
            <button type="submit" class="btn btn-default">Continuar</button>
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
    <div class="col-lg-4 space-up space-down">
        <div class="center-align">
            <img src="assets/imagens/icone-usuario.png" class="img-rounded" id="icone">
            <p>
            Agora digite a sua senha
            </p>
        </div>
        <div class="container form-box">
            <br/>
            <form action="javascript:void(0);" onsubmit="validacaoSenha('${email}')">
            <div class="form-group">
                    <label for="senha">Senha:</label>
                    <input type="password" class="form-control" id="senha">
            </div>
            <div class="checkbox">
                <label><input type="checkbox"> Mantenha-me conectado</label>
            </div>
            <button type="submit" class="btn btn-default">Entrar</button>
            </form>
            <br/>
        </div>
    </div>
      `;
}
function paginaitem(id, item, descricao, avaliacao, preco, endereco, imagem, locatario, locatarioImagem) {
    var estrelas = '';
            for (e = 0; e < 5; e++) {
                if (element.avaliacao >= 1) {
                    estrelas += '<i class="fa fa-star" style="color:rgb(0, 100, 254);"></i>'
                } else {
                    if (element.avaliacao > 0) {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    } else {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    }
                }
                element.avaliacao -= 1;
                 }
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
                <h5>${estrelas}</h5>
                <p class="preço">R$${preco}</p>
                <p>${endereco}</p>
                <p>${descricao}</p>
                <div class="center-align">
                    <button class="btn btn-default btn-big" onclick="">Iniciar chat</button>
                </div>
            </div>
        </div>
    </div>
    `;
}
function paginaitemlocatario(id, item, descricao, avaliacao, preco, endereco, imagem, locatario, locatarioImagem) {
    var estrelas = '';
            for (e = 0; e < 5; e++) {
                if (element.avaliacao >= 1) {
                    estrelas += '<i class="fa fa-star" style="color:rgb(0, 100, 254);"></i>'
                } else {
                    if (element.avaliacao > 0) {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    } else {
                        estrelas += '<i class="fa fa-star-o" style="color:rgb(243, 239, 29);"></i>'
                    }
                }
                element.avaliacao -= 1;
                 }
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
            <h5>${estrelas}</h5>
            <p class="preço">R$${preco}</p>
            <p>${endereco}</p>
            <p>${descricao}</p>
            <div class="container" id="chatbox">

            </div>
            </div>
        </div>
    </div>
    `;
    exibirchat(id);
}
function paginameusitens() {
    content.innerHTML = `
    <div class="col-lg-10 container space-up">
        <div class="row" id="grid">
        </div>
    </div>
    `;
    let grid = document.querySelector("#grid");
    exibirmeusitens();
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
            <form action="javascript:void(0);" onsubmit="faleconosco();">
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
            </form>
        </div>
    </div>
    `;
}
function paginapesquisa(){
  content.innerHTML =`
    <div class="col-lg-10 container space-up">
        <div class="row" id="grid">
        </div>
    </div>
    `;
  let grid = document.querySelector("#grid");
  exibirresultados();
}