'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURL = 'http://greenvelvet.alwaysdata.net/bugTracker/api/add';


    let userToken = sessionStorage.getItem("token");
    let userId = sessionStorage.getItem("id");
    let save = document.querySelector('#save')

    let bugTitle = document.querySelector('#bug-title')
    let bugDescription = document.querySelector('#bug-description')
    console.log(`${apiURL}/${userToken}/${userId}`)

    save.addEventListener('click', () => {
        fetch(`${apiURL}/${userToken}/${userId}`, {

            // Adding method type
            method: "POST",

            // Adding body or contents to send
            body: JSON.stringify({
                title: bugTitle.value,
                description: bugDescription.value,
            }),
        })

        .then((res) => res.json())
            .then((response) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            })

    })

});