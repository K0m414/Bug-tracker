'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
    //VARIABLE
    const apiURL = 'http://greenvelvet.alwaysdata.net/bugTracker/api/list';
    let tbody = document.querySelector('#main-page tbody');
    let bug;
    let bugTable = document.querySelector('#table-list');

    let userToken = sessionStorage.getItem("token");
    let userId = sessionStorage.getItem("id");
    let fullList = true;
    bugTable.addEventListener('click', () => {
        console.log(`${apiURL}/${userToken}/${userId}`)
        if (fullList === true) {
            userId = 0;
            fullList = false;
            bugTable.innerHTML = 'Mes bugs'

        } else {
            userId = sessionStorage.getItem("id");
            fullList = true;
            bugTable.innerHTML = 'Liste des bugs'
        }
        fetchApi()
    })
    fetchApi()

    function fetchApi() {
        // http://greenvelvet.alwaysdata.net/bugTracker/api/users/cc0d3902021f973bb2838a73febdda33

        fetch(`${apiURL}/${userToken}/${userId}`)
            .then(response => response.json())
            .then(json => {
                console.log(json.result.bug)
                bug = json.result.bug;
                bug.forEach(element => tbodyText(element));
            })
            .catch(err => {
                console.log(err);
            })
    }

    function dateConvert(timestamp) {
        let timestampDate = timestamp;
        let date = new Date(timestampDate);
        console.log(date)
        return date.toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    function tbodyText(value) {
        console.log(value.timestamp)
        console.log(dateConvert(value.timestamp))
        tbody.innerHTML +=
            ` <tr>
            <td>${value.title}</td>
            <td>${value.timestamp}</td>
            <td>nom d'utilisateur</td>
            <td>
                <select name="etat" id="etat">
            <option value="">etat</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            </select>
            </td>
            <td><button class="button">Suprimer</button></td>
        </tr>`
    }
});