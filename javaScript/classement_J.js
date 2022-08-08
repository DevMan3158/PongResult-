let numberList = 0;
let listData = [];
let id = -1;


function addRow(data) {
    return '<tr id="annuaire_classement_'+data.id+'">'+
    //'<td class="id">'+data.id+'</td>'+

    

    '<td class="tournoi">'+data.Rang+'</td>'+
    '<td class="date">'+data.Points+'</td>'+
    '<td class="type">'+data.Joueurs+'</td>'+
    '<td class="name">'+data.Club+'</td>'+
    '<td class="Match">'+data.Match+'</td>'+
    '<td class="Pays">'+data.Pays+'</td>'+


    '<th scope="col"><img src="./img/icons8-modifier.svg" class="modif" alt="modifier" /></th>'+
    '<th scope="col"><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>'+
    '</tr>';
}

function addRowData(number, Rang, Points, Joueurs, Club, Match, Pays) {

    return {
        "id" : number,
        "number" : number,
        "Rang" : Rang,
        "Points" : Points,
        "Joueurs" : Joueurs,
        "Club" : Club,
        "Match" : Match,
        "Pays" : Pays,
    };
}


//Modifier

function addEventAll() {
    document.querySelectorAll(".modif").forEach(element => {
        element.addEventListener("click", function(e) {
            id = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
            let myIndex = rechercheKey(id);
            if (myIndex !== -1) {
                let data = listData[myIndex];
                document.getElementById("Rang").value = data.Rang;
                document.getElementById("Points").value = data.Points;
                document.getElementById("Joueurs").value = data.Joueurs;
                document.getElementById("Club").value = data.Club;
                document.getElementById("Match").value = data.Match;
                document.getElementById("Pays").value = data.Pays;
               }
        })
    });


    //Supression

    document.querySelectorAll(".delete").forEach(element => {
        element.addEventListener("click", function(e) {
            let id = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
            let Joueurs = "";
            let Rang = "";
            let myIndex = rechercheKey(id);
            if (myIndex !== -1) {
                let data = listData[myIndex];
                Joueurs = data.Joueurs;
                Rang = data.Rang;
            }
            if(confirm("Attention vous allez supprimer '"+Joueurs+" "+Rang+"'. 'Ok' pour continuer.")) {
                let myIndex = rechercheKey(id);
                if (myIndex !== -1) {
                    listData.splice(myIndex, 1);
                    addValueTab();
                }
            }
        })
    });
}



function annulerDef() {
    row_select = undefined;

    document.getElementById("Rang").value = "";
    document.getElementById("Points").value = "";
    document.getElementById("Club").value = "";
    document.getElementById("Match").value = "";
    document.getElementById("Pays").value = "";
    document.getElementById("Joueurs").value = ""
}

function rechercheKey(id) {
    for (let index = 0; index < listData.length; index++) {
        if(listData[index].id == id) {
            return index
        }
    }
    return -1;
}


//Recherche

function findTab() {
    let find = document.getElementById("recherche").value;
    let list_classement = document.getElementById("list_classement");
    list_classement.innerHTML = "";
    if(find == "") {
        listData.forEach(element => {
            list_classement.innerHTML += addRow(element);
        });
    } else {
        let tableFind = listFind(find);
        tableFind.forEach(element => {
            list_classement.innerHTML += addRow(element);
        });
    }

    addEventAll();
}



function addValueTab() {
    findTab();

    saveLocal();
}



document.getElementById("valider").addEventListener("click", function(e) {
    e.preventDefault();
    let Rang = document.getElementById("Rang").value;
    let Points = document.getElementById("Points").value;
    let Club = document.getElementById("Club").value;
    let Match = document.getElementById("Match").value;
    let Pays = document.getElementById("Pays").value;
    let Joueurs = document.getElementById("Joueurs").value;


    if(Joueurs.trim() != "" && Rang.trim() != "") {

        if(id < 0) {
            listData.push(addRowData(numberList, Rang, Points, Joueurs, Club, Match, Pays));
            numberList++;
        } else {
            listData[rechercheKey(id)] = addRowData(id, Rang, Points, Joueurs, Club, Match, Pays);
        }

        id = -1;

        addValueTab();

        annulerDef();

    } else {
        alert("Merci d'entrer un Joueurs et un Rang.");
    }
})

function saveLocal() {
    let values = {
        "number" : numberList,
        "listData" : listData,

    }
    localStorage.setItem('annuaire_classement', JSON.stringify(values));
}

/*Local_storage*/

function loadLocal() {
    var annuaire_classement = localStorage.getItem('annuaire_classement');
    if(annuaire_classement !== undefined && annuaire_classement != "") {
        let values = JSON.parse(annuaire_classement);
        if(values != undefined && values != "") {
            numberList = values.number;
            listData = values.listData;
            addValueTab();
        }
    }
}

/*
sauvegarde de la page cree dans le back office
*/

function saveFile() {
    let name_file = "new_file_" + Date.now() + ".json";
    let values = {
        "number" : numberList,
        "listData" : listData,
    }
    var blob = new Blob([JSON.stringify(values)], { type: "text" });
    const blobUrl = URL.createObjectURL(blob);
    
    var fileLink = document.createElement("a");
    fileLink.href = blobUrl;
    
    fileLink.download = name_file;
    
    fileLink.click();
}

function loadFiles(event) {
    let files = event.target.files;

    if (files.length <= 0) {
        return false;
    }
  
    var fr = new FileReader();
  
    fr.onload = function(e) {
    var result = JSON.parse(e.target.result);
    numberList = result.number;
    listData = result.listData;
    addValueTab();
  }
  
  fr.readAsText(files.item(0));
}


function listFind(find) {
    let values = [];
    listData.forEach(element => {
        if(
            element.Rang.toLowerCase().includes(find.toLowerCase()) ||
            element.Points.toLowerCase().includes(find.toLowerCase()) ||
            element.Joueurs.toLowerCase().includes(find.toLowerCase()) ||
            element.Club.toLowerCase().includes(find.toLowerCase()) || 
            element.Match.toLowerCase().includes(find.toLowerCase()) || 
            element.Pays.toLowerCase().includes(find.toLowerCase())) {
                values.push(element);
        }
    });
    return values;
}



document.getElementById("annuler").addEventListener("click", function(e) {
    e.preventDefault();
    annulerDef();
})

document.getElementById("save").addEventListener("click", saveFile);

document.getElementById("bt_find").addEventListener("click", function(e) {
    findTab();
})

// en cas de changement de fichier (ici d'image)

document.getElementById('fileToUpload').addEventListener('change', loadFiles);

loadLocal();

