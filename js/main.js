'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURL = 'http://greenvelvet.alwaysdata.net/bugTracker/api/login';
    const errorList = document.querySelector('.error');
    let errors = [];

    let buttonLogin = document.querySelector('#connection');
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let userToken;
    let userId;
    // console.log(username.value)
    buttonLogin.addEventListener('click', (e) => {
        e.preventDefault();
        errors = [];
        console.log(username.value, password.value)
        if (username.value === '') {
            errors.push('Veuillez entrer votre identifiant')
        }
        if (password.value === '') {
            errors.push('Veuillez entrer votre mot de passe')
        } else {
            fetch(`${apiURL}/${username.value}/${password.value}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json.result.token)
                    userToken = json.result.token;
                    userId = json.result.id;
                    console.log(json.result.status);
                    if (userId !== 0) {
                        console.log(userToken);
                        sessionStorage.setItem("id", [userId]);
                        sessionStorage.setItem("token", [userToken]);
                        let bugsFullList= true;
                        sessionStorage.setItem('bugsFullList', bugsFullList);
                        window.location.replace('main-page.html')
                    } 
                    else{
                        errors.push('Mot de passe ou l\'identifiant n\'est reconnu')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

        console.log(errors)
        errorList.innerHTML =
        errors.map(error => errorList.innerHTML += `<li> ${error}</li>`)
    })

});