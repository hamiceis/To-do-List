const lista = document.querySelector('.lista-container')
const formInput = document.querySelector('.input-list')
const formSearch = document.querySelector('.form-search')


const adcTarefa = inputValue => {
    if(inputValue){
         lista.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center" data-lista="${inputValue}">
        <i data-finish="${inputValue}" class=""></i>
        <span data-span="${inputValue}">${inputValue}</span>
        <i data-lixo="${inputValue}" class="bi bi-trash3"></i>
    </li>`
    event.target.reset()
    }
}

formInput.addEventListener('submit', event =>{
    event.preventDefault()
    const ClickedElement = event.target.add.value
    adcTarefa(ClickedElement)
})

const  removerTarefa = ClickedElement => {
    const trashData = ClickedElement.dataset.lixo
    const data = document.querySelector(`[data-lista="${trashData}"]`)

    if(ClickedElement.dataset.lixo){
        data.remove()
    }
}


const concluirTarefa = ClickedElement => {
    const finishData = ClickedElement.dataset.span
    const data = document.querySelector(`[data-finish="${finishData}"]`)

    if(ClickedElement.dataset.span){
        data.classList.toggle('bi-patch-check')
    }
}


lista.addEventListener('click', event => {
    const ClickedElement = event.target
    removerTarefa(ClickedElement)
    concluirTarefa(ClickedElement)

})


function filterTarefas(tarefas, inputValue, check){
    return tarefas.filter(tarefa => {
     const checagem = tarefa.textContent.toLowerCase().trim().includes(inputValue)
        return checagem ? check : !check
    })
}

function manipularClasses(tarefas, classAdd, classRemove){
    tarefas.forEach(tarefa =>{
        tarefa.classList.add(classAdd)
        tarefa.classList.remove(classRemove)
    })
}



function mostrarTarefa(tarefa, inputValue){
    const mostrar = filterTarefas(tarefa, inputValue, true)
    manipularClasses(mostrar, 'd-flex','d-none')
}


function esconderTarefa(tarefa, inputValue){
    const esconder = filterTarefas(tarefa, inputValue, false)
    manipularClasses(esconder,'d-none','d-flex')

}


formSearch.addEventListener('input', event => {
    const listaTarefas = Array.from(lista.children)
    const inputValue = event.target.value.toLowerCase()
    esconderTarefa(listaTarefas,inputValue)
    mostrarTarefa(listaTarefas,inputValue)
})