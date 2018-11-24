function paginahome() {
  content.innerHTML = `
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
function menuLogado() {
  navbar.innerHTML = `
    <li class="nav-item active perfil" id="perfil" onclick="abrirPerfil()">
    <img src="${usuario.imagemMenor}" alt="" class="perfil-icon"/><a class="nav-link">${usuario.nome}</a>
    </li>
    <li class="nav-item active perfil" id="favoritos" onclick="abrirfavoritos()">
      <a class="nav-link">Favoritos</a>
    </li>
    <li class="nav-item active" onclick="paginasobre()">
      <a class="nav-link">Sobre</a>
    </li>
    <li class="nav-item active" onclick="paginaajuda()">
      <a class="nav-link">Ajuda</a>
    </li>
    `;
  let perfil = document.querySelector("#perfil");
  let favoritos = document.querySelector("#favoritos");
  options.innerHTML = `
    <li class="perfil-item" onclick="paginaperfil()">
        <a>Perfil</a>
    </li>
    <li class="perfil-item"  onclick="paginameusitens()">
        <a>Meus Itens</a>
    </li>
    <li class="perfil-item" onclick="paginacadastrarproduto()">
        <a>Cadastrar Item</a>
    </li>
    <li class="perfil-item" onclick="logoff()">
        <a>Sair</a>
    </li>
    </div>
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
            <h6>Fotos:</h6>
            <label for="campoimagem" class="miniatura"><img src="assets/imagens/carregar_foto.png" class="miniatura-img" id="miniatura"/><i class="fa fa-camera"></i></label>
            <input type="file" id="campoimagem" multiple="multiple" hidden/>
            <div class="mini-miniaturas">
            <img src="" id="miniatura2"/><img src="" id="miniatura3"/><img src="" id="miniatura3"/>
            </div>
            <br/>
            <ul class="ul-btn"><button type="submit" class="btn btn-default">Cadastrar</button></ul>
            </form> 
        </div>
    </div>
    `;
  var camponome = document.querySelector('#camponome');
  var campopreço = document.querySelector('#campopreço');
  var campodescricao = document.querySelector('#campodescriçao');
  var file = document.querySelector('#campoimagem');
  file.addEventListener('change', prepararImagem);
  var miniatura = document.querySelector('#miniatura');
  var miniatura2 = document.querySelector('#miniatura2');
  var miniatura3 = document.querySelector('#miniatura3');
  var miniatura4 = document.querySelector('#miniatura4');
}
function paginacadastrarusuario() {
  content.innerHTML = `
    <div class="col-lg-5 space-up">
        <div class="container form-box">
            <br/>
            <form action="javascript:void(0);" onsubmit="cadastrarusuario()">
            <div class="form-group">
                <label>Nome</label>
                <input type="text" class="form-control" id="camponome"/>
            </div>
            <div class="form-group">
                <label>Telefone</label>
                <input type="tel" class="form-control" id="campotelefone""/>
            </div>
            <div class="form-group">
            <label>E-mail</label>
            <input type="email" class="form-control" id="campoemail"/>
            </div>
            <div class="form-group">
                <label>Senha</label>
                <input type="password" class="form-control" id="camposenha"/>
            </div>
            <h6>Foto de perfil:</h6>
            <label for="campoimagem" class="miniatura"><img src="assets/imagens/carregar_foto.png" class="miniatura-img" id="miniatura"/><i class="fa fa-camera"></i></label>
            <input type="file" id="campoimagem" hidden/>
            <div class="checkbox" >
              <label><input type="checkbox" id="localcheck">Obter localização atual</label>
            </div>
            <div class="checkbox">
                <label><input type="checkbox">Li e concordo com os <a href="termos e políticas.docx">Termos de uso</a>.</label>
            </div>
            <br/>
            <ul class="ul-btn"><button type="submit" class="btn btn-default">Cadastrar</button></ul>
            </form>
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
  var miniatura = document.querySelector('#miniatura');
}
function paginalogar() {
  content.innerHTML = `
  <div class="col-lg-4 space-up space-down">
        <div class="center-align">
        <br/>  
  <br/><br/>
        <img src="assets/imagens/icone-usuario.png" class="img-rounded">
        <br/>    
        <br/>
                Olá! Digite o seu E-mail
            </i>
        </div>
        <br/>
        <div class="container form-box">
            <br/>
            <form action="javascript:void(0);" onsubmit="validacaoEmail()">
            <div class="form-group">
                <label for="email">E-mail:</label>
                <input type="email" class="form-control" id="email">
            </div>
            <button type="submit" class="btn btn-default">Continuar</button>
            <p>
            Não tem uma conta? <a class="navbar-brand" onclick="paginacadastrarusuario()">Crie uma!</a>
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
function paginaitem(id, item, locatario, descricao, avaliacao, preco, endereco, imagem, nome, locatarioImagem) {
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
                <br/>
                <small>por ${nome}</small>
                </h1>
                <h3 class="my-3">${descricao}</h3>
                <h4>${estrelas}</h4>
                <p class="preço">R$${preco}</p>
                <p>${endereco}</p>
                <p>${descricao}</p>
                <div class="chat-box" id="chatbox">
                  <div class="center-align">
                    <button class="btn btn-default btn-big" onclick="iniciarchat(${id + "," + locatario});"><i class="fa fa-comments" aria-hidden="true"></i>Iniciar chat</button>
                  </div>
                </div>
            </div>
        </div>
    </div>
    `;
  let chatbox = document.querySelector("#chatbox");
  verificarchat(usuario.id, id);
}
<<<<<<< HEAD
function chatbase(nome) {
  chatbox.innerHTML = `
=======
function chatbase(nome, id) {
    chatbox.innerHTML = `
>>>>>>> 3ec85a46b0f488fef1c325101d12f6b1285699ad
    <div class="mesgs box">
      <h5 class="center-align chat-title">${nome}</h5>
      <div class="msg_history" id="messagearea">
        
      </div>
      <div class="type_msg">
        <div class="input_msg_write">
          <input type="text" class="write_msg" id="mensagemparaenviar" />
          <button class="msg_send_btn" type="button" onclick="enviarmensagem(${id})"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
    `;
  let messagearea = document.querySelector('#messagearea');
}
function outgoingmsg(texto) {
  message.innerHTML = `
  <div class="sent_msg">
    <p>${texto}</p>
    <span class="time_date"> 11:01 AM    |    June 9</span> 
  </div>
  `;

}
function incomingmsg(imagem, texto) {
  message.innerHTML = `
  <div class="incoming_msg_img"> <img src="${imagem}" alt="sunil"> </div>
  <div class="received_msg">
    <div class="received_withd_msg">
      <p>${texto}</p>
      <span class="time_date"> 11:01 AM    |    June 9</span>
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
    <div class="container space-up center-space">
        <div class="row box">
            <div class="col-md-8 center-align">
            <img class="img-fluid item-img" src="${imagem}" alt="">
            </div>
            <div class="col-md-4 right-box">
            <h3 class="my-3 center-align">
            ${item}
            </h3>
            <h5 class="pulado">${estrelas}</h5>
            <p class="preço">R$${preco}</p>
            <p class="pulado"><i class="fa fa-map-marker" aria-hidden="true"></i> ${endereco}</p>
            <h3 class="pulado">Descrição</h3>
            <p class="pulado">${descricao}</p>
            <div class="chat-box" id="chatbox">
            
            </div>
            </div>
        </div>
    </div>
    `;
  let chatbox = document.querySelector("#chatbox");
  chatbox.innerHTML = `
    <h3 class="text-center">Chat</h3>
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
  chatnames(id);
}
function paginameusitens() {
  content.innerHTML = `
    <div class="col-lg-10 container space-up">
      <div class="text-center"><h3>Meus itens</h3></div>
        <div class="row" id="grid">
        </div>
    </div>
    `;
  let grid = document.querySelector("#grid");
  exibirmeusitens();
}
function paginaperfil() {
  content.innerHTML = `
    <hr>
<div class="container bootstrap snippet space-up">
    <div class="row">
  		<div class="col-sm-3"><!--left col-->
              

      <div class="text-center">
        <label for="img-input" class="img-label"><img src="${usuario.imagemCompleta}" class="avatar img-circle img-thumbnail" alt="avatar"><i class="fas fa-camera"></i></label>
        <label for="img-input" class="img-btn">Selecionar foto</label>
        <input type="file" class="text-center center-block file-upload" id="img-input" hidden>
      </div></hr><br>
          
          <ul class="list-group">
            <li class="list-group-item text-muted">Atividade <i class="fa fa-dashboard fa-1x"></i></li>
            <li class="list-group-item text-right" onclick="paginameusitens()"><span class="pull-left"><strong>Meus itens</strong></span></li>
            <li class="list-group-item text-right" onclick="abrirfavoritos()"><span class="pull-left"><strong>Favoritos</strong></span></li>
          </ul> 
          
        </div><!--/col-3-->
    	<div class="col-sm-9">
          <h5>Perfil</h5>  
          <div class="tab-content">
            <div class="tab-pane active" id="home">
                <hr>
                  <form class="form" action="##" method="post" id="registrationForm">
                      <div class="form-group">
                          
                          <div class="col-xs-8">
                              <label for="first_name"><h4>Nome</h4></label>
                              <input type="text" class="form-control" name="first_name" id="first_name" value="${usuario.nome}" title="Nome">
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="phone"><h4>Telefone</h4></label>
                              <input type="text" class="form-control" name="phone" id="phone" value="${usuario.telefone}" title="(DDD) 00000-0000">
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="email"><h4>Email</h4></label>
                              <input type="email" class="form-control" name="email" id="email" value="${usuario.email}" title="Seu email atual.">
                          </div>
                      </div>
                      <div class="form-group">
                          
                          <div class="col-xs-6">
                              <label for="email"><h4>Endereço</h4></label>
                              <input type="email" class="form-control" id="location" value="${usuario.endereco}" title="Localização atual">
                          </div>
                      </div>
                      <div class="form-group">
                           <div class="col-xs-12">
                                <br>
                              	<button class="btn btn-lg btn-success" type="submit"><i class="glyphicon glyphicon-ok-sign"></i> Salvar</button>
                            </div>
                      </div>
              	</form>
        </div>
    </div>
</div>
    `;
}
function paginasobre() {
  content.innerHTML = `
    <div class="container">
      <!-- Team Members Row -->
      <br/>
      <div class="row">
        <div class="col-lg-12">
          <h2 class="my-4 center-align">Nossa Equipe</h2>
        </div>
        <br/><br>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="assets/imagens/rafael.jpg" width="200px" alt="">
          <h3>Rafael Sousa
          </h3>
          <i>Gerente</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="assets/imagens/paulo.jpg" width="200px" alt="">
          <h3>Paulo Schiavetti
          </h3>
          <i>Programador Back-End</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="assets/imagens/gabriel.jpg" width="200px"alt="">
          <h3>Gabriel Lopes
          </h3>
          <i>Programador Front-End</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="assets/imagens/larissa.jpg" width="200px" alt="">
          <h3>Larissa Adriana
          </h3>
          <i>Documentação</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="assets/imagens/liandra.jpg" width="200px" alt="">
          <h3>Liandra Manara
          </h3>
          <i>Documentação</i>
        </div>
        <div class="col-lg-4 col-sm-6 text-center mb-4">
          <img class="rounded-circle img-fluid d-block mx-auto" src="assets/imagens/igor.jpg" width="200px" alt="">
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
    `;
}
function paginaajuda() {
  content.innerHTML = `
    <!-- Portfolio Grid -->
    <section class="bg-light" id="portfolio">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h2 class="section-heading text-uppercase">Central de Ajuda</h2>
            <h3 class="section-subheading text-muted">Aqui você poderá esclarecer suas principais dúvidas</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="assets/imagens/maos.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>Como alugar um item ? </h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal2">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="assets/imagens/porta.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>Como me cadastrar ?</h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal3">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="assets/imagens/porco.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>Como cadastrar um item para alugar ?</h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal4">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="assets/imagens/van.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>Como posso fretar meu produto ?</h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal5">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="assets/imagens/seguro.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>Como posso me previnir de hackers ou falsos negociantes ?</h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal6">
              <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                  <i class="fas fa-plus fa-3x"></i>
                </div>
              </div>
              <img class="img-fluid" src="assets/imagens/informacao.jpg" alt="">
            </a>
            <div class="portfolio-caption">
              <h4>Demais informações</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="center-page">
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
    </section>

    <!-- Portfolio Modals -->

    <!-- Modal 1 -->
    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-uppercase">Processo de Locação</h2>
                  <p>Após encontrar o item do seu desejo, você pode solicitar a locação para o locador, simplesmente apertando o botão de <b>"Allugar"</b>, é muito fácil!</p>
                    Ao selecionar o item do seu agrado, é possível ver as características como o tipo de produto, o preço pela diária, o usuário que publicou o produto, a descrição feita pelo locador, etc.
                    Se o item cobrir todas as suas expectativas e você estiver disposto a efetuar o acordo, pressione o botão <b>"Allugar"</b> e logo após, selecione no calendário os dias que você irá utilizar o produto.
                    Logo após isso, uma notificação sua chegará ao locador sobre seu item, com todas suas informações, como os seus dados, os dias que você irá utilizar o produto e também o motivo adotado pela locação de tal produto.
                    Em seguida, o locador irá responder positivamente ou não sobre o seu pedido, caso ele aceite sua oferta, vai ser aberto um chat entre você e o locador para organizarem onde e quando será realizada a entrega e a devolução do produto.
                  </p>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    Entendi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 2 -->
    <div class="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-uppercase">Cadastrar usuário</h2>
                  <p>Crie sua conta agora e saia alugando os itens que você precise.</p>
                  Caso você esteja navegando pelo nosso site como visitante, primeiramente, seja bem-vindo! Em seguida, eu convido você a criar sua própria conta Allugar, é muito mais fácil do que parece.
                  Para você se cadastrar como um usuário, primeiramente clique em <b>"Cadastrar"</b> na parte superior direita da página, logo após, é preciso que você insira uma série de seus dados para que sua conta seja criada (Não se esqueça de aceitar os termos e condições de nosso sistema)
                  Dados como Nome completo, E-mail, Endereço e Telefone são essênciais para o seu cadastro e para uma eventual negociação.
                  Após esses procedimentos, você poderá ter acesso a locações de todos os itens que estão disponíveis no nosso site, e então, que comece os jogos.
                </p>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    Entendi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 3 -->
    <div class="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-uppercase">Cadastro de itens</h2>
                  <p>Logo após o seu cadastro como usuário, você ganhan o direito de publicar qualquer item para locação, gerando uma renda extra para você</p>
                  Para que um item seja publicado para locação, primeiramente você deverá possuir uma conta Allugar e estar logado ao sistema.
                  Depois do processo de locação, ao clicar no botão <b>"Perfil"</b>, aparecerá uma opção <b>"Cadastrar Item"</b>.
                  Assim como no cadastro de usuário, você terá de inserir dados do seu item, como foto recente, tipo de produto, descrição e preço cobrado pela diária, logo após, clique em <b>"Cadatrar Item"</b>
                  Depois de Cadastrado, seu item está sujeito a receber ofertas de qualquer usuário do site, assim que alguém se interessar pelo seu item, uma notificação chegrará até você, a oferta fica a seu gosto, podendo aceitá-la como também negá-la. 
                  </p>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    Entendi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 4 -->
    <div class="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-uppercase">Sistema de Fretamento</h2>
                  <p>Se você estiver longe de seu item desejado, isso não é um problema, nós resolvemos isso para você.</p>
                  <p>Suponhamos que você tenha encontrado seu item ideal, porém a distância entre você e o locador impossibilita que o item chegue até você, com o nosso sistema de fretamento isso não vai acontecer.
                    Ao entrar em negociação com o locador sobre determinado item, aparecerá uma opção <b>"Fretamento"</b> do item, onde você poderá pedir que a equipe Allugar de realize um transporte, sendo cobrada uma taxa sobre o processo.
                    Após solicitar o fretamento,você não precisará se preocupar em questão ao transporte, desde a busca até a entrega do fica de responsabilidade exclusiva de nossa equipe. 
                  </p>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    Entendi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 5 -->
    <div class="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-uppercase">Segurança</h2>
                  <p>Para que você tenha uma boa experiência com nosso ambiente, é preciso que você tenha conforto, facilidade e principalmente segurança.</p>
                  A equipe Allugar recomenda que, antes de você começar uma negociação, seja feita uma análise sobre o usuário e o item. O sistema disponibiliza comentários sobre ambos, o que facilita uma pesquisa sobre cada item e cada usuário em particular.
                  Verifique se o usuário é confiável para os outros usuários, se seu item tem um bom histórico, para garantir uma boa negociação e um bom ambiente.</p>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    Entendi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 6 -->
    <div class="portfolio-modal modal fade" id="portfolioModal6" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="close-modal" data-dismiss="modal">
            <div class="lr">
              <div class="rl"></div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-8 mx-auto">
                <div class="modal-body">
                  <!-- Project Details Go Here -->
                  <h2 class="text-uppercase">Termos e Condições</h2>
                  <p>Comprrendendo de que o sistema de gerenciamento Allugar é um ambiente social e que aceita todas os tipos de usuários, é preciso que termos e condições sejam estabelecidos.</p> 
                  Para manter uma boa comunicação entre o sistema e você, a equipe Allugar estabeleceu termos para o serviço do site, é preciso que você aceite os termos para continuar seu cadastro e cada desrespeito ocorrerá numa possível banição do sistema.
                
                  </br>
                  Veja : <h3><a href="termos e políticas.docx">Allugar - Termos e Condições</a></h3>
                  </p>
                  <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fas"></i>
                    Entendi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
    `;
}
function paginapesquisa() {
  content.innerHTML = `
    <div class="col-lg-10 container space-up">
        <div class="row" id="grid">
        </div>
    </div>
    `;
  let grid = document.querySelector("#grid");
  exibirresultados();
}