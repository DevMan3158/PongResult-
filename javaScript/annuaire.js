let numberList = 0;
let listData = [];
let id = -1;

function addRow(data) {
    return '<tr id="annuaire_'+data.id+'">'+
    //'<td class="id">'+data.id+'</td>'+


   '<td class="tournoi">'+data.tournoi+'</td>'+
    '<td class="date">'+data.date+'</td>'+
    '<td class="type">'+data.type+'</td>'+
    '<td class="name">'+data.name+'</td>'+
    '<td class="Bat">'+data.Bat+'</td>'+
    '<td class="firstname">'+data.firstname+'</td>'+
    '<td class="club">'+data.club+'</td>'+
    '<td class="pays">'+data.pays+'</td>'+
    '<td class="duree">'+data.duree+'</td>'+
    '<td class="prolongation">'+data.prolongation+'</td>'+
    '<td class="score">'+data.score+'</td>'+

    '<th scope="col"><img src="./img/icons8-modifier.svg" class="modif" alt="modifier" /></th>'+
    '<th scope="col"><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>'+
    '</tr>';
}

function addRowData(number, tournoi, date, type, name, Bat, firstname, sexe, club, pays, duree, prolongation, score) {

    return {
        "id" : number,
        "tournoi" : tournoi,
        "date" : date,
        "type" : type,
        "name" : name,
        "Bat" : Bat,
        "firstname" : firstname,
        "sexe" : sexe,
        "club" : club,
        "pays" : pays,
        "duree" : duree,
        "prolongation" : prolongation,
        "score" : score,
    };
}

function addEventAll() {
    document.querySelectorAll(".modif").forEach(element => {
        element.addEventListener("click", function(e) {
            id = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
            let myIndex = rechercheKey(id);
            if (myIndex !== -1) {
                let data = listData[myIndex];
                document.getElementById("tournoi").value = data.tournoi;
                document.getElementById("date").value = data.date;
                document.getElementById("type").value = data.type;
                document.getElementById("name").value = data.name;
                document.getElementById("Bat").value = data.Bat;
                document.getElementById("firstname").value = data.firstname;
                document.getElementById("sexe").value = data.sexe;
                document.getElementById("club").value = data.club;
                document.getElementById("pays").value = data.pays;
                document.getElementById("duree").value = data.duree;
                document.getElementById("prolongation").value = data.prolongation;
                document.getElementById("score").value = data.score;
            }
        })
    });


    document.querySelectorAll(".delete").forEach(element => {
        element.addEventListener("click", function(e) {
            let id = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
            let name = "";
            let firstname = "";
            let myIndex = rechercheKey(id);
            if (myIndex !== -1) {
                let data = listData[myIndex];
                name = data.name;
                firstname = data.firstname;
            }
            if(confirm("Attention vous allez supprimer '"+name+" "+firstname+"'. 'Ok' pour continuer.")) {
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

    document.getElementById("tournoi").value = "";
    document.getElementById("date").value = "";
    document.getElementById("type").value = "";
    document.getElementById("name").value = "";
    document.getElementById("Bat").value = "";
    document.getElementById("firstname").value = "";
    document.getElementById("sexe").value = "";
    document.getElementById("club").value = "";
    document.getElementById("pays").value = "";
    document.getElementById("duree").value = "";
    document.getElementById("prolongation").value = "";
    document.getElementById("score").value = "";
}

function rechercheKey(id) {
    for (let index = 0; index < listData.length; index++) {
        if(listData[index].id == id) {
            return index
        }
    }
    return -1;
}

function findTab() {
    let find = document.getElementById("recherche").value;
    let list_annuaire = document.getElementById("list_annuaire");
    list_annuaire.innerHTML = "";
    if(find == "") {
        listData.forEach(element => {
            list_annuaire.innerHTML += addRow(element);
        });
    } else {
        let tableFind = listFind(find);
        tableFind.forEach(element => {
            list_annuaire.innerHTML += addRow(element);
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
    let tournoi = document.getElementById("tournoi").value;
    let date = document.getElementById("date").value;
    let type = document.getElementById("type").value;
    let name = document.getElementById("name").value;
    let Bat = document.getElementById("Bat").value;
    let firstname = document.getElementById("firstname").value;
    let sexe = document.getElementById("sexe").value;
    let club = document.getElementById("club").value;
    let pays = document.getElementById("pays").value;
    let duree = document.getElementById("duree").value;
    let prolongation = document.getElementById("prolongation").value;
    let score = document.getElementById("score").value;

    if(name.trim() != "" && firstname.trim() != "") {

        if(id < 0) {
            listData.push(addRowData(numberList, tournoi, date, type, name, Bat, firstname, sexe, club, pays, duree, prolongation, score));
            numberList++;
        } else {
            listData[rechercheKey(id)] = addRowData(id, tournoi, date, type, name, Bat, firstname, sexe, club, pays, duree, prolongation, score);
        }

        id = -1;

        addValueTab();

        annulerDef();

    } else {
        alert("Merci d'entrer un nom et un prénom.");
    }
})

function saveLocal() {
    let values = {
        "number" : numberList,
        "listData" : listData,

    }
    localStorage.setItem('annuaire', JSON.stringify(values));
}

function loadLocal() {
    var annuaire = localStorage.getItem('annuaire');
    if(annuaire !== undefined && annuaire != "") {
        let values = JSON.parse(annuaire);
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
            element.tournoi.toLowerCase().includes(find.toLowerCase()) ||
            element.date.toLowerCase().includes(find.toLowerCase()) ||
            element.type.toLowerCase().includes(find.toLowerCase()) ||
            element.name.toLowerCase().includes(find.toLowerCase()) || 
            element.Bat.toLowerCase().includes(find.toLowerCase()) || 
            element.firstname.toLowerCase().includes(find.toLowerCase()) || 
            element.sexe.toLowerCase().includes(find.toLowerCase()) || 
            element.club.toLowerCase().includes(find.toLowerCase()) || 
            element.pays.toLowerCase().includes(find.toLowerCase()) || 
            element.duree.toLowerCase().includes(find.toLowerCase()) || 
            element.prolongation.toLowerCase().includes(find.toLowerCase()) || 
            element.score.toLowerCase().includes(find.toLowerCase())) {
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