'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURL = 'http://greenvelvet.alwaysdata.net/bugTracker/api/signup';
    const errorText = document.querySelector('.error');
    let errors = [];

    let password;

    let buttonSignup = document.querySelector('#signup');
    let username = document.querySelector('#username').value;
    let password1 = document.querySelector('#password');
    let password2 = document.querySelector('#re-password');

    buttonSignup.addEventListener('click', (e) => {
        e.preventDefault();
        if (password1.value === password2.value) {
            password = password1.value
            console.log(username, password)

            fetch(`${apiURL}/${username}/${password}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            errors.push('Les mots de passe ne correspondent pas')
            console.log(errors)
        }
        errors.map(error => errorText.innerHTML += error)
    })
});