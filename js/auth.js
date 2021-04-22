const username = document.querySelector('.username');
const password = document.querySelector('.password');
const btn = document.querySelector('.btn-success');
const id = document.querySelector('.identificator');

btn.addEventListener('click', e => {
    e.preventDefault();

    const userID = Number(id.value);

    if(username.value === "" && password.value === "" && id.value === "") alert("Пустые поля!");
    
    if(username.value !== "" && password.value !== "" && id.value !== ""){

        function user(){
            const user = JSON.parse(localStorage.getItem('user'));
            const checkUser = user.map(item => {

                if(username.value === item.username && password.value === item.password && userID === item.id){
                    alert('Welcome!');
                    window.open('index.html', '_self');
                    localStorage.setItem('isAuth', 'true');
                }else {
                    alert('Wrong username, password or id');
                    localStorage.setItem('isAuth', 'false');
                    username.value = ""
                    password.value = ""
                    id.value = ""
                }
            })
        }

        user();
    }

})

window.addEventListener('load', () => {
    const isAuth = localStorage.getItem('isAuth');

    if(!isAuth) return;

    if(isAuth === 'true'){
        window.open('index.html', '_self');
    }
});

function userid(){
    const user = JSON.parse(localStorage.getItem('user'));
    const regAuth = localStorage.getItem('regAuth');
    
    const userID = user.map(item => {
        if(regAuth === 'true'){
            alert("Запомните ваш ID " + item.id + " Он вам понадобится для входа!");
        }else {
            return
        }
    })
}

userid();