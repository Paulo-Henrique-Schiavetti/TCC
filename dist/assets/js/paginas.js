function paginacadastrarproduto() {
    grid.innerHTML = `
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
    grid.innerHTML = `
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