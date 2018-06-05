function item(id, locatario, nome, preco, descricao, imagem, estrelas) {
    content.innerHTML = `
    <div class="col s12 m4" data-id="${id}">
        <div class="card">
            <div class="card-image">
                <img src="${imagem}" alt=""/>
                <div class="card-content">
                <div class="card-nome">
                    ${nome}
                    </div>
                    <div class="card-botoes">
                        <a class="btn btnalugar">Allugar</a>
                        <a class="btn btnadd"><i class="material-icons">add</i></a>
                    </div>
                    <div class="card-down">
                        ${estrelas}  R$${preco}
                        <i class="material-icons">location_on</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
function paginacadastrarproduto() {
    content.innerHTML = `
    <div class="container">
        <ul class="center-align" id="cadastrodeprodutos">
            <input type="text" id="camponome" placeholder="Nome"/>
            <input type="text" id="campopreço" placeholder="Preço"/>
            <input type="text" id="campodescrição" placeholder="Descrição"/>
            <input type="file" id="campoimagem"/>
            <button onclick="cadastrarproduto()">Cadastrar</button>
        </ul>
    </div>
    `;
}
function paginacadastrarusuario() {
    content.innerHTML = `
    <div class="container">
        <ul class="center-align" id="cadastrodeprodutos">
            <input type="text" id="campoemail" placeholder="Email"/>
            <input type="text" id="camposenha" placeholder="Senha"/>
            <input type="text" id="camponome" placeholder="Nome"/>
            <input type="text" id="campotelefone" placeholder="__ ___ _ ____-____"/>
            <button onclick="cadastrarusuario()">Cadastrar</button>
        </ul>
    </div>
    <div class="container">
        <ul class="center-align">
            <button onclick="geosave()">mapear</button><button id='loading'>carregando</button>
        </ul>
    </div>
    `;
}
function paginaitem(id, item, locatario, imagem, comentarios) {
            content.innerHTML = `
            <div class="container">
                <ul class="center-align paginaitem">
                    <p>${item} por: ${locatario}</p>
                    <img src="${imagem}" alt=""/>
                    <div class="comentarios">
                        ${comentarios}
                    </div>
                </ul>
            </div>
            `;
    
}