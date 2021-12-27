'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURLAdd = 'http://greenvelvet.alwaysdata.net/bugTracker/api/add';
    const apiURLDelete = 'http://greenvelvet.alwaysdata.net/bugTracker/api/delete';
    
    // document
    const logoutButton = document.querySelector('.logout');
    const myBugs = document.querySelector('.my-bugs')
    const save = document.querySelector('#save')
    let bugTitle = document.querySelector('#bug-title')
    let bugDescription = document.querySelector('#bug-description')

    // sessionStorage
    const userToken = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id");


    myBugs.addEventListener('click', () => {
            sessionStorage.setItem('bugsFullList', false);
        })

    // add a new bug
    save.addEventListener('click', () => {
        fetch(`${apiURLAdd}/${userToken}/${userId}`, {

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
                window.location.replace('main-page.html')
            })
            .catch(err => {
                console.log(err);
            })

    })
        logoutButton.addEventListener('click', () => {
                fetch(`http://greenvelvet.alwaysdata.net/bugTracker/api/logout/${userToken}`)
                .then(response => response.json())
                .then(json => { console.log(json)
                    sessionStorage.clear();
                    window.location.replace('index.html')
                })
                .catch(err => {
                    console.log(err);
                })
        })


});