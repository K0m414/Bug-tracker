'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURL = 'http://greenvelvet.alwaysdata.net/bugTracker/api/login';
    const errorText = document.querySelector('.error');
    let errors = [];

    let buttonLogin = document.querySelector('#connection');
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    // console.log(username.value)
    buttonLogin.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(username.value, password.value)
        fetch(`${apiURL}/${username.value}/${password.value}`)
            .then(response => response.json())
            .then(json => {
                console.log(json.result.id)
                window.location.replace('main-page.html?user_id=' + json.result.id)
            })
            .catch(err => {
                console.log(err);
            })
    })

});