'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURLList = 'http://greenvelvet.alwaysdata.net/bugTracker/api/list';
    const apiURLUsers = 'http://greenvelvet.alwaysdata.net/bugTracker/api/users';
    const apiURLState = 'http://greenvelvet.alwaysdata.net/bugTracker/api/state';
    const apiURLDelete = 'http://greenvelvet.alwaysdata.net/bugTracker/api/delete';
    
    // text
    const tbody = document.querySelector('#main-page tbody');
    const bugList = document.querySelector('#bug-list');
    const myBugs = document.querySelector('#my-bugs');
    const tableCaption = document.querySelector('caption');
    const logoutButton = document.querySelector('.logout');

    //sessionStorage
    const userToken = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id");

    let usernameList = [];
    let bugsList = [];

    // display bug list
    let bugsFullList;//= sessionStorage.getItem;

    // bugstate
    let bugsState;
    let bugStateIndex;
    let bugID;
    let bugsArray = [];
    let bugsState0 = [];
    let bugsState1 = [];
    let bugsState2 = [];

    displayBugList(myBugs, false)
    displayBugList(bugList, true)
    fetchUsernameList()
    logout()

    // display fullBugsList or myBugsList
    function displayBugList(button, boolean){
        button.addEventListener('click', () => {
            bugsFullList= boolean;
            sessionStorage.setItem('bugsFullList', bugsFullList);
            fetchUsernameList()
        })
    }

    // get user list on the api
    function fetchUsernameList(){
        fetch(`${apiURLUsers}/${userToken}`)
        .then(response => response.json())
        .then(json => {
            usernameList=json.result.user
            //
            if(bugsFullList === false){
                //
                fetchBugsList(userId)
            }
            else{
                fetchBugsList(0)
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    // get bugs list on the api and rewrite the document
    function fetchBugsList(id){
        fetch(`${apiURLList}/${userToken}/${id}`)
            .then(response => response.json())
            .then(json => {
                bugsList = json.result.bug;
                // bugsArray = [];
                captionText(bugsList)
                tbody.innerHTML =''
                bugsList.forEach(bug =>{ tbodyText(bug)
                    // console.log(bug.state);
                });
            })
            .catch(err => {
                   console.log(err);
                   if(bugsList === undefined){ 
                    window.location.replace('index.html')
                }
                
            })
    }
    // text in the caption
    function captionText(array){
        for(let i = 0 ; i< array.length; i++ ){
            bugsArray.push(array[i].state);
            // console.log(bugsArray);
            //********
            if(bugsArray[i]==0){
                bugsState0.push(bugsArray[i])
            }
            if(bugsArray[i]==1){
                bugsState1.push(bugsArray[i])
            }
            if(bugsArray[i]==2){
                bugsState2.push(bugsArray[i])
            }
            tableCaption.innerHTML = 
        `nombre total de bugs : ${array.length}, 
        nombre de bugs non traités ${bugsState0.length}, 
        nombre de bugs en cours : ${bugsState1.length} 
        et nombre de bugs traités : ${bugsState2.length}` ;
        }
        
    }

    // text in the tbody
    function tbodyText(value) {
        tbody.innerHTML +=
            ` <tr >
            <td><strong>${value.title}</strong><br>
            ${value.description}
            </td>
            <td>${timestampsToDate(value.timestamp)}</td>
            <td>${usernameList[value.user_id]}</td>
            <td>
                <select data-bug-id="${value.id}" name="bugs-state" class="bugs-state">
                    <option value="0" ${value.state === "0" ? "selected" : ""} selected>Non traité</option>
                    <option value="1" ${value.state === "1" ? "selected" : ""}>En cours</option>
                    <option value="2" ${value.state === "2" ? "selected" : ""}>Traité</option>
                
                </select>
            </td>
            <td><button data-id="${value.id}" class="delete">Suprimer</button></td>
        </tr>`
        changeBugState()
        deleteBug()
    }

    // convert date into fr date
    function timestampsToDate(timestamp) {
        let timestampDate = timestamp*1000;
        let date = new Date(timestampDate);
        return date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    // change the bug state with the select
    function changeBugState(){
        bugsState = document.querySelectorAll('.bugs-state');
        bugsState.forEach(element => 
            element.addEventListener('change', () => {
            bugStateIndex =element.options.selectedIndex
            bugID = element.dataset.bugId
            fetch(`${apiURLState}/${userToken}/${bugID}/${bugStateIndex}`)
            .then(response => response.json())
            .then(json => {
            console.log(json)
            window.location.replace('main-page.html')
            })
            .catch(err => {
                console.log(err);
            })
        }))
    }

    // delete a bug on click
    function deleteBug(){
        let deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(element => 
            element.addEventListener('click', () => {
                bugID = element.dataset.id
                fetch(`${apiURLDelete}/${userToken}/${bugID}`)
                .then(response => response.json())
                .then(json => { console.log(json)
                    window.location.replace('main-page.html')
                })
                .catch(err => {
                    console.log(err);
                })
            }))
    }

    // log out and clear sessionStorage
    function logout(){
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
    }
    
});