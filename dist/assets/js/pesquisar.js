function dropdown(){
    dados.some(element => {
        numerodeitensnalista++;
        if(numerodeitensnalista>5){
            verdadeiralista.innerHTML += `<li class="collection-item"><a>...</a></li>`;
            return true;
        }
    verdadeiralista.innerHTML += `<li class="collection-item"><a>${element.nome}</a></li>`;
    }
}