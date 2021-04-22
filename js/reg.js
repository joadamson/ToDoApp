const username = document.querySelector('.username');
const password = document.querySelector('.password');
const btn = document.querySelector('.signUp');
const iden = document.querySelector('.id');

window.addEventListener('load', () => {
    const isUser = localStorage.getItem('user');
    if(!isUser){
        localStorage.setItem('user', JSON.stringify([]));
    }
})

function id(){
    return Math.floor(Math.random() * 100000);
}

btn.addEventListener('click', e => {
    e.preventDefault();

    if(username.value === "" && password.value === "") {
        alert("Пустые поля!");
        localStorage.setItem('regAuth', 'false')
    }
    
    if(username.value !== "" && password.value !== ""){
        const user = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify([...user, {
            username: username.value,
            password: password.value,
            id: id()
        }]));
        window.open('index.html', '_self');
        localStorage.setItem('regAuth', 'true');
    }
});

window.addEventListener('load', () => {
    const regAuth = localStorage.getItem('regAuth');

    if(!regAuth) return
    
    if(regAuth === 'true'){
        window.open('index.html', '_self')
    }
});