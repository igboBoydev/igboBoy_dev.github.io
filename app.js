const backgroundColor = document.querySelector('div.div > .img');
const backgroundColor2 = document.querySelector('div.div > .img1')
const ulBackground = document.querySelector('div.div1');
const ul = document.querySelector('ul');
const select = document.querySelectorAll('div.secDiv')
let inputValue = document.getElementById('myInput');
let inputFocus = document.getElementById('myInput').focus();
const form = document.querySelector('#inputs')
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const firstIcon = document.querySelector('.img');
const filterOption = document.querySelector('div.div1 > div.div2')
const secIcon = document.querySelector('.img1');
let span = document.querySelector('span.span')


backgroundColor.addEventListener('click', color1)

backgroundColor2.addEventListener('click', color2)

form.addEventListener('submit', addTodo)

ul.addEventListener('click', deleteTodo)

ul.addEventListener('click', iconChange)



function addTodo(e){
    e.preventDefault()
    let res = inputValue.value;
    if(res !== ''){
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        const img = document.createElement('img');
        img.classList.add('check')
        img.src = 'images/icon-cross.svg'
        let li = document.createElement('li')
        let iTag = document.createElement('i')
        li.setAttribute('draggable', 'true')
        iTag.classList.add('far', 'fa-circle')
        iTag.setAttribute('data', 'nil')
        span1.innerHTML = `${res}`;
        let spine = document.createElement('span')
        spine.append(iTag, span1)
        span2.appendChild(img)
        li.append(spine, span2)
        let lis = document.querySelectorAll('li')
        let listNum = lis.length;
        if(listNum === 0){
            span.textContent = 1;
        }else{
            span.textContent = listNum + 1;
        }
        ul.appendChild(li);
    }else{
        alert('You aint inputted a todo yet')
    }
    inputValue.value = ''
}


function color2(){
    body.classList.remove('body');
    nav.classList.remove('nav');
    firstIcon.classList.remove('display');
    secIcon.classList.add('display')
    inputValue.style.background = '#fff'
    inputValue.style.borderColor = '#fff'
    ulBackground.style.background = '#fff'
    ulBackground.style.borderColor = '#fff'
    ulBackground.style.color = '#333'
    inputFocus.style.background = '#fff'
    inputFocus.style.color = '#333'
    select.style.borderColor = '#fff'
}

function color1(){
    body.classList.add('body');
    nav.classList.add('nav');
    firstIcon.classList.add('display');
    secIcon.classList.remove('display')
    inputValue.style.background = '#333'
    inputValue.style.borderColor = '#333'
    ulBackground.style.background = '#333'
    ulBackground.style.borderColor = '#333'
    ulBackground.style.color = '#fff'
    inputFocus.style.background = '#333'
    inputFocus.style.color = '#fff'
    select.style.borderColor = '#333'
}


function deleteTodo(e){
   let t  = e.target;
   if(t.classList[0] === 'check'){
       let parentElements = t.parentElement.parentElement
      parentElements.remove()
      let lis = document.querySelectorAll('li')
      let listNum = lis.length + 1;
      if(listNum === 0){
          span.textContent = 1;
      }else{
          span.textContent = listNum - 1;
      }
   }
}

const check = e =>  {
    let element = e.target.parentElement.parentElement
    const draggableElements = element;
    draggableElements.addEventListener('dragstart', () => {
        draggableElements.setAttribute('id', 'dragging')
    })
     draggableElements.addEventListener('dragend', () => {
        draggableElements.removeAttribute('id', 'dragging')
    })
}

ul.addEventListener('click', check)


const dragOverEvent = e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(ul, e.clientY)
    const draggable = document.querySelector('#dragging');
        if (afterElement == null) {
            ul.appendChild(draggable)
        } else {
            ul.insertBefore(draggable, afterElement)
        }
}

ul.addEventListener('dragover', dragOverEvent)

function getDragAfterElement(ul, y) {
    const draggableElements = [...ul.querySelectorAll('li:not(.dragging)')]
    return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
    return { offset: offset, element: child }
    } else {
        return closest
    }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


function iconChange(e){
    let r = e.target;
    let textCont = r.parentElement;
    let comp = textCont.parentElement;
    let parentUl = comp.parentElement;
    if(r.hasAttribute('data')){
        r.removeAttribute('data', 'nil');
       r.classList.remove('fa-circle');
       r.classList.add('fa-check-circle');
       textCont.style.textDecoration = 'line-through'
       comp.classList.add('completed')
        filterOption.addEventListener('click', filterTodo)
        const secondSelect = document.querySelectorAll('div.secDiv')
        secondSelect.forEach(second => {
            second.addEventListener('click', e => {
                let a = e.target;
                if (a.classList.contains('completed')) {
                    comp.style.backgroundColor = 'rgb(125, 149, 208)'
                } 
            })
        })
       
       function filterTodo(p) {
           let x = p.target;
           if(x.classList.contains('completed')){
            comp.style.backgroundColor = 'rgb(125, 149, 208)'
           }
           if (x.classList.contains('clearTodo')) {
                if(comp.classList[0] === 'completed'){
                    comp.remove()
                    let lis = document.querySelectorAll('li')
                    let listNum = lis.length;
                    if(listNum === 0){
                        span.textContent = 0;
                    }else{
                        span.textContent = listNum --;
                    }        
                }else{
                    alert('Not done with any todo yet, get back to work please!!!');
                }
            }
        }
    } else{
        r.setAttribute('data', 'nil')
        r.classList.add('fa-circle');
        r.classList.remove('fa-check-circle')
        textCont.style.textDecoration = 'none'
        textCont.removeAttribute('id')
        comp.removeAttribute('class')
        filterOption.addEventListener('click', filterTodo)
        function filterTodo(p) {
           let x = p.target;
           if(x.classList[0] === 'completed'){
              comp.style.backgroundColor = 'white'
           }
       }
       comp.style.backgroundColor = 'white'
    }
}












