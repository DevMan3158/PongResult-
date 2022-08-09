let numberList_class = 0;
let listData_class = [];
let id_class = -1;


function addRow(data) {
    return '<tr id_class="annuaireClassement_'+data.id_class+'">'+
    //'<td class="id_class">'+data.id_class+'</td>'+

    

    '<td class="tournoi">'+data.Rang+'</td>'+
    '<td class="date">'+data.Points+'</td>'+
    '<td class="type">'+data.Joueurs+'</td>'+
    '<td class="name">'+data.Club+'</td>'+
    '<td class="Match">'+data.Match+'</td>'+
    '<td class="Pays">'+data.Pays+'</td>'+


    /*'<th scope="col"><img src="./img/icons8-modifier.svg" class="modif" alt="modifier" /></th>'+
    '<th scope="col"><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>'+*/
    '</tr>';
}

function addRowData(number, Rang, Points, Joueurs, Club, Match, Pays) {

    return {
        "id_class" : number,
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
            id_class = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
            let myIndex = rechercheKey(id);
            if (myIndex !== -1) {
                let data = listData_class[myIndex];
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
            let id_class = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
            let Joueurs = "";
            let Rang = "";
            let myIndex = rechercheKey(id_class);
            if (myIndex !== -1) {
                let data = listData_class[myIndex];
                Joueurs = data.Joueurs;
                Rang = data.Rang;
            }
            if(confirm("Attention vous allez supprimer '"+Joueurs+" "+Rang+"'. 'Ok' pour continuer.")) {
                let myIndex = rechercheKey(id_class);
                if (myIndex !== -1) {
                    listData_class.splice(myIndex, 1);
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

function rechercheKey(id_class) {
    for (let index = 0; index < listData_class.length; index++) {
        if(listData_class[index].id_class == id_class) {
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
        listData_class.forEach(element => {
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

        if(id_class < 0) {
            listData_class.push(addRowData(numberList_class, Rang, Points, Joueurs, Club, Match, Pays));
            numberList_class++;
        } else {
            listData_class[rechercheKey(id_class)] = addRowData(id_class, Rang, Points, Joueurs, Club, Match, Pays);
        }

        id_class = -1;

        addValueTab();

        annulerDef();

    } else {
        alert("Merci d'entrer un Joueurs et un Rang.");
    }
})

function saveLocal() {
    let values = {
        "number" : numberList_class,
        "listData_class" : listData_class,

    }
    localStorage.setItem('annuaire_classement', JSON.stringify(values));
}

/*Local_storage*/

function loadLocal() {
    var annuaire_classement = localStorage.getItem('annuaire_classement');
    if(annuaire_classement !== undefined && annuaire_classement != "") {
        let values = JSON.parse(annuaire_classement);
        if(values != undefined && values != "") {
            numberList_class = values.number;
            listData_class = values.listData_class;
            addValueTab();
        }
    }
}

/*
sauvegarde de la page cree dans le back office
*/

function saveFile() {
    let name_file = "new_file_classement_" + Date.now() + ".json";
    let values = {
        "number" : numberList_class,
        "listData_class" : listData_class,
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
    numberList_class = result.number;
    listData_class = result.listData_class;
    addValueTab();
  }
  
  fr.readAsText(files.item(0));
}


function listFind(find) {
    let values = [];
    listData_class.forEach(element => {
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

