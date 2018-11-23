function iniciarchat(id, locatario) {
    if(usuario.id){
        axios.post('/iniciarchat', {
            item_id: id, locatario_id: locatario, locador_id: usuario.id
        })
        .then(()=> {
            verificarchat(locatario, id);
        })
        .catch((error)=>{
            console.log(error);
        });
    } else {
        mensagemtemporaria("você deve ter uma conta para iniciar uma conversa!");
        return false;
    }
}
function chatnames(id) {
    axios
        .get(`/chatnames/${id}`)
        .then(response => {
            response.data.forEach(element => {
                div = document.createElement("div");
                div.setAttribute("class", "chat_list");
                div.setAttribute("onclick", `verificarchat(${element.id}, ${element.item_id})`)
                div.innerHTML = `
                <div class="chat_people">
                <div class="chat_img"> <img src="${element.imagemMenor}" alt="sunil"> </div>
                <div class="chat_ib">
                <h5>${element.nome} <span class="chat_date">Dec 25</span></h5>
                </div>
                </div>
                `;
                inboxchat.appendChild(div);
            });
        });
}
function verificarchat(id, item){
    axios
        .get(`/verificarchat/${id}/${item}`)
        .then(response => {
            if (!response.data == ""){
                chatbase(response.data.nome, response.data.id)
                exibirchat(response.data.id);
            }
        })
}
function exibirchat(id) {
    axios
        .get(`/exibirchat/${id}`)
        .then(response => {
            response.data.forEach(element => {
                if (element.usuario_id == usuario.id) {
                    outgoingmsg(element.mensagem);
                } else {
                    incomingmsg(element.imagem, element.mensagem);
                }
            });
        });
}
function enviarmensagem(conversa) {
    var mensagem = document.querySelector('#mensagemparaenviar');
    axios
        .post(`/enviarmensagem`, {conversa_id: conversa, usuario_id: usuario.id, datahora: Date.now(), mensagem: mensagem.value})
        .then(()=> {
            outgoingmsg(mensagem.value);
            mensagem.value = "";
        })
        .catch(error => {
            console.log(error);
        })
    
}