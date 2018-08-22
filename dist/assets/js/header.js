function header(inhome = false) {
    if (loged){
        headertop.innerHTML =`
                <span class="sign" onclick='paginacadastrarproduto()'>Item <i class="fa fa-sign-in"></i></span>
        `;  
    } else {
        headertop.innerHTML = `
                <span class="sign" onclick='paginacadastrarusuario()'>Cadastrar <i class="fa fa-user-plus"></i></span>
                <span class="sign" onclick='paginalogar()'>Entrar <i class="fa fa-sign-in"></i></span>
        `;
    }
    if(inhome){
        headerbase.innerHTML =`
            <ul class="center-align pesquisar">
                <div class="nav-wrapper">
                    <form>
                        <input type="text" id="pesquisar" placeholder="O que você precisa?"/><i class="fa fa-search"></i>
                        <ul class="dropdown-pesquisar" id="dropdown">
                            <!-- html no content.js -->
                        </ul>
                    </form>
                </div>
            </ul>
        `;
        let pesquisar = document.querySelector("#pesquisar");
        let dropdown = document.querySelector("#dropdown");
        pesquisar.addEventListener("keyup", pesquisa);
        lista.addEventListener("click", mostrarlista);
    } else {
        headerbase.innerHTML = '';
    }
}