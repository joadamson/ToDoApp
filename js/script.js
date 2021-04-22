const title = document.querySelector('.title');
const content = document.querySelector('.content');
const submitBtn = document.querySelector('.submitBtn');
const container = document.querySelector('.row');

window.addEventListener('load', () => {
    const isTodos = localStorage.getItem('todos');

    if(!isTodos){
        localStorage.setItem('todos', JSON.stringify([]));
    }else {
        const todos = JSON.parse(localStorage.getItem('todos'));

        const newTodos = todos.map((item, index) => {
            return {...item, id: index};
        })
        localStorage.setItem('todos', JSON.stringify(newTodos));

        const template = newTodos.reverse().reduce((prev, {title, content, date, completed, id}) =>{
            if(completed){
                return prev + `<div class="col-lg-6 mb-4 completed">${cardTemplate(title, content, date, id)}</div>`
            }else{
                return prev + `<div class="col-lg-6 mb-4">${cardTemplate(title, content, date, id)}</div>`
            }
        }, '')
        container.innerHTML = template;
    }
});

submitBtn.addEventListener('click', e => {
    e.preventDefault();
    if(title.value === "" & content.value === "") alert('Поля не должны быть пустыми');
    
    if(title.value !== "" & content.value !== ""){
        const todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos)
        localStorage.setItem('todos', JSON.stringify([...todos, {
            title: title.value,
            content: content.value,
            date: currentTime(),
            completed: false
        }]));
        window.location.reload();
    }
});

// Шаблон карточки

function cardTemplate(title, content, time, id){
    if(content.length >= 350){
        return `
            <div class="card">
                <div class="card-header d-flex">
                    <h3 class="card-title mb-0">${title}</h3>
                </div>
                <div class="card-body content shorted">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                    <button onclick="deleteTask(${id})" class="btn btn-danger">Delete</button>
                    <button onclick="completeTask(${id})" class="btn btn-success">Complete</button>
                    <button onclick="editTask(${id})" class="btn btn-primary">Edit</button>
                </div>
            </div>
        `
    }else {
        return `
            <div class="card">
                <div class="card-header d-flex">
                    <h3 class="card-title mb-0">${title}</h3>
                </div>
                <div class="card-body content">
                    <p>${content}</p>
                    <span class="time">${time}</span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-around">
                    <button  onclick="deleteTask(${id})" class="btn btn-danger">Delete</button>
                    <button onclick="completeTask(${id})" class="btn btn-success">Complete</button>
                    <button onclick="editTask(${id})" class="btn btn-primary">Edit</button>
                </div>
            </div>
        `
    }
}

// Our current time

function currentTime(){
    return `
        ${moment().format('L')} ${moment().format('LTS')}
    `
}

// Change Theme

const body = document.body;
const selector = document.querySelector('.theme-selector');

selector.addEventListener('change', e => {
    const value = e.target.value;

    if(value === "light"){
        body.style.background = "#efefef"
        localStorage.setItem('bgColor', "#efefef");
        localStorage.setItem('themeValue', 'light');
    }else if (value === "dark"){
        body.style.background = "#212529"
        localStorage.setItem('bgColor', "#212529")
        localStorage.setItem('themeValue', 'dark');
    }else if (value === "custom"){
        const askColor =  prompt('Your custom color?');
        body.style.background = askColor;
        localStorage.setItem('bgColor', askColor);
        localStorage.setItem('themeValue', 'custom');
    }
});

window.addEventListener('load',() => {
    body.style.background = localStorage.getItem('bgColor');
    selector.value = localStorage.getItem('themeValue');
});

function deleteTask(id){
    const askDelete = confirm('are you sure?')

    if(!askDelete) return;
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.filter(item => item.id !== id);

    localStorage.setItem('todos', JSON.stringify(newTodos));

    window.location.reload();
}

function completeTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));

    const newTodos = todos.map(item => {
        if(item.id === id){
            return {
                ...item,
                completed: !item.completed
            }
        }else{
            return item
        }
    })
    
    localStorage.setItem('todos', JSON.stringify(newTodos));

    window.location.reload();
}

function editTask(id){
    const todos = JSON.parse(localStorage.getItem('todos'));
    const newTodos = todos.map(item => {
        if(item.id === id){
            return {
                ...item,
                title: `${prompt('New title', item.title)} (ред.)`,
                content: `${prompt('New title', item.content)} (ред.)`,
                date: `${currentTime()} (ред.)`
            }
        }else {
            return item
        }
    })

    localStorage.setItem('todos', JSON.stringify(newTodos));
    window.location.reload();
}

window.addEventListener('load', () => {
    const isAuth = localStorage.getItem('isAuth');
    const regAuth = localStorage.getItem('regAuth');

    if(isAuth === 'true' && regAuth === 'true'){
        return
    }else if(isAuth === 'false' || regAuth === 'false'){
        window.open('auth.html', '_self');
    }
})


const userMenu = document.querySelector('.user-menu');
const sideBar = document.querySelector('.sideBar');

userMenu.addEventListener('click', e => {
    e.preventDefault();

    sideBar.classList.toggle('activeSide');
    
    function userOutup(){
        const user = JSON.parse(localStorage.getItem('user'));
        const userID = user.map(item => {
            if(item.username && item.id){
               const outupUsername = document.querySelector('.outupUsername').innerHTML = `Ваш никнейм @${item.username}`;
               const outupId = document.querySelector('.outupId').innerHTML = `Ваш id${item.id}`;


            }else {
                return
            }
        })
    }
    
    userOutup();  
})


const signOutBtn = document.querySelector('.signOutBtn');

signOutBtn.addEventListener('click', e => {
    e.preventDefault();

    localStorage.setItem('isAuth', 'false');
    window.location.reload();
})