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
        </div>
    `;
}