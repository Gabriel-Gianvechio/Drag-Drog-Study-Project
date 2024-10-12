let areas = {
    a: null,
    b: null,
    c: null
}

document.querySelectorAll('.item').forEach( item => {
    item.addEventListener('dragstart', dragStart); // dragstart é nativo JS e ativa ao começar ARRASTAR algo, nesse caso chama a função com o mesmo nome dragStart
    item.addEventListener('dragend', dragEnd); // dragend ativa ao soltar um item, nesse caso chama a função dragEnd
});

document.querySelectorAll('.area').forEach( area => {
    area.addEventListener('dragover', dragOver); // dragover vai chamar a função quando ENTRAR em uma area com drag
    area.addEventListener('dragleave', dragLeave); // dragend chama a função quando SAIR de uma area com drag
    area.addEventListener('drop', drop); // drop chama a função quando SOLTAMOS o item no local com drag
});

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeave);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

// Functions Item
function dragStart(e){
    e.currentTarget.classList.add('dragging'); // o estilo da classe dragging está definido em CSS, entao ao receber essa classe, recebe os estilos definidos.
}

function dragEnd(e){
    e.currentTarget.classList.remove('dragging'); //perde a classe dragging, para perder os efeitos visuais que foram definidos
}

// Function Area
function dragOver(e){
    if (e.currentTarget.querySelector('.item') === null) { // SE a area estiver ocupada, nao continua essa func nao faz nada
        e.preventDefault(); //aqui de fato liberamos para que o item seja dropado na area (gera um efeitinho visual sinalizando que pode dropar)
        e.currentTarget.classList.add('hover'); //classe hover foi criada no CSS para estilizar a area por onde estou passando o item    
    }
}

function dragLeave(e){
    e.currentTarget.classList.remove('hover'); // remove a classe hover, para remover o efeito visual
}

function drop(e){
    e.currentTarget.classList.remove('hover');
    if (e.currentTarget.querySelector('.item') === null) { // SE a area que soltei o item, não tiver nenhum outro item (null) então faça:
        
        let dragItem = document.querySelector('.item.dragging'); // recebe um item q tenha a classe item e a classe dragging tambem (aquela q definimos para receber quando estivermos segurando um item)
        e.currentTarget.appendChild(dragItem);  // appendChild adiciona dentro do elemento o item que eu especificar (como está vazio, vai ter só oq eu definir aqui) ele pega o item de onde ele estiver e coloca ele onde eu definir, nao faz uma cópia, mas leva ele.
        updateAreas();
    }
}


//function Area Neutra
function dragOverNeutral(e){
    e.preventDefault(); //aqui de fato liberamos para que o item seja dropado na area (gera um efeitinho visual sinalizando que pode dropar)
    e.currentTarget.classList.add('hover'); //classe hover foi criada no CSS para estilizar a area por onde estou passando o item    
}

function dropNeutral(e){
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging'); // recebe um item q tenha a classe item e a classe dragging tambem (aquela q definimos para receber quando estivermos segurando um item)
    e.currentTarget.appendChild(dragItem);  // appendChild adiciona dentro do elemento o item que eu especificar (como está vazio, vai ter só oq eu definir aqui) ele pega o item de onde ele estiver e coloca ele onde eu definir, nao faz uma cópia, mas leva ele.
    updateAreas();
}


//Logic Functions
function updateAreas(){
    document.querySelectorAll('.area').forEach(area => { //pego as divs com classe AREA
        let name = area.getAttribute('data-name'); //guardo na var name o que tiver em data-name (é: a,b ou c)

        if (area.querySelector('.item') !== null){ // se a area TIVER algum item então:
            areas[name] = area.querySelector('.item').innerHTML; // areas[a,b ou c] guarda o valor do item (que no caso é 1, 2 ou 3)
        }else {
            areas[name] = null;
        }
    });
    console.log(areas); //verificar o resultado que obtivemos

    if (areas.a === '1' && areas.b === '2' && areas.c === '3'){
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}