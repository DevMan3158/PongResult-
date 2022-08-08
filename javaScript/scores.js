/*onglets*/
$( function() {
  $( "#tabs" ).tabs();
} );

/*flouter*/
$( "#joueur" ).first().click(function() {
    $( "#joueur" ).fadeTo( "slow", 0.33 );
  });
$( "#jB" ).first().click(function() {
    $( "#jA" ).fadeTo( "slow", 0.33 );
  }); 
$( "#b1").first().click(function() {
    $( '#jA').fadeTo( "slow", 0.3 );
  });   
$( "#b1").first().click(function() {
    $( '#jB').fadeTo( "slow", 0.3 );
  });   
$( "#b2").first().click(function() {
    $( '#jA').fadeTo( "slow", 1 );
  });   
$( "#b2").first().click(function() {
    $( '#jB').fadeTo( "slow", 1 );
  });   
  
/*graphique*/
const graph = document.getElementById("graph").getContext("2d");

let myChart = new Chart(graph, {
    type: "horizontalBar",
    data: {
        labels: [
            "JoueurA",
            "JoueurB",
            "JoueurC",
            "JoueurD",
            "JoueurE",
    ],
    datasets: [
        {
        label:"Score",
        data: [215, 212, 156, 132, 129],
        backgroundColor: [
            "purple",
            "red",
            "pink",
            "orange",
            "yellow",
        ],
        hoverBorderWidth: 30,
        },
    ],
    },
    options:{
        title: {
            display: true,
            text: "Les 5 joueurs au podium",
            fontSize: 25,
        },
    legend: {
        display: false,
    }   
    }
});
/*ajouter un match*/
let numberList = 0;
let listData = [];
let id = -1;

function addRow(data) {
    return '<tr id="scoresSM_'+data.id+'">'+
    //'<td class="id">'+data.id+'</td>'+
   '<td class="dateSM">'+data.dateSM+'</td>'+
    '<td class="tournoiSM">'+data.tournoiSM+'</td>'+
    '<td class="matchSM">'+data.matchSM+'</td>'+
    '<td class="lieuSM">'+data.lieuSM+'</td>'+
    '<td class="joueur">'+data.joueur+'</td>'+
    '<td class="set1SM">'+data.set1SM+'</td>'+
    '<td class="set2SM">'+data.set2SM+'</td>'+
    '<td class="set3SM">'+data.set3SM+'</td>'+
    '<td class="set4SM">'+data.set4SM+'</td>'+
    '<td class="scoreSM">'+data.scoreSM+'</td>'+
    
    '<th scope="col"><img src="./img/icons8-modifier.svg" class="modif" alt="modifier" /></th>'+
    '<th scope="col"><img src="./img/poubelle.svg" class="delete" alt="supprimer" /></th>'+
    
    '</tr>';
}
function addRowData(number, dateSM, tournoiSM,
   matchSM, lieu, joueur, set1SM, set2SM, set3SM, set4SM, score) {

  return {
      "id" : number,
      "dateSM" : dateSM,
      "tournoiSM" : tournoiSM,
      "matchSM" : matchSM,
      "lieuSM" : lieu,
      "joueur" : joueur,
      "set1SM" : set1SM,
      "set2SM" : set2SM,
      "set3SM" : set3SM,
      "set4SM" : set4SM,
      "scoreSM" : score,
  };
}

function addEventAll() {
  document.querySelectorAll(".ajouter").forEach(element => {
      element.addEventListener("click", function(e) {
          id = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
          let myIndex = rechercheKey(id);
          if (myIndex !== -1) {
              let data = listData[myIndex];
              document.getElementById("dateSM").value =data.dateSM;
              document.getElementById("tournoiSM").value = data.tournoiSM;
              document.getElementById("matchSM").value = data.tournoiSM;
              document.getElementById("lieu").value = data.lieuSM;
              document.getElementById("joueur").value = data.joueur;
              document.getElementById("set1SM").value = data.set1SM;
              document.getElementById("set2SM").value = data.set2SM;
              document.getElementById("set3SM").value = data.set3SM;
              document.getElementById("set4SM").value = data.set4SM;
              document.getElementById("scoreSM").value = data.scoreSM;
          }
      })
  });

  document.querySelectorAll(".annuler").forEach(element => {
    element.addEventListener("click", function(e) {
        let id = parseInt(document.getElementById(this.parentNode.parentNode.id).id.split("_")[1]);
        let name = "";
        let set1SM = "";
        let myIndex = rechercheKey(id);
        if (myIndex !== -1) {
            let data = listData[myIndex];
            name = data.name;
            set1SM = data.set1SM;
        }
        if(confirm("Attention vous allez supprimer '"+name+" "+set1SM+"'. 'Ok' pour continuer.")) {
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

  document.getElementById("dateSM").value ="";
  document.getElementById("tournoiSM").value = "";
  document.getElementById("matchSM").value = "";
  document.getElementById("lieu").value = "";
  document.getElementById("joueur").value = "";
  document.getElementById("set1SM").value = "";
  document.getElementById("set2SM").value = "";
  document.getElementById("set3SM").value = "";
  document.getElementById("set4SM").value = "";
  document.getElementById("scoreSM").value = "";
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
  let ScoresMatchs = document.getElementById("ScoresMatchs");
  ScoresMatchs.innerHTML = "";
  if(find == "") {
      listData.forEach(element => {
          ScoresMatchs.innerHTML += addRow(element);
      });
  } else {
      let tableFind = listFind(find);
      tableFind.forEach(element => {
          ScoresMatchs.innerHTML += addRow(element);
      });
  }

  addEventAll();
}

function addValueTab() {
  findTab();

  saveLocal();
}

document.getElementById("ajouter").addEventListener("click", function(e) {
  e.preventDefault();
  let dateSM = document.getElementById("dateSM").value;
  let tournoiSM = document.getElementById("tournoiSM").value;
  let matchSM = document.getElementById("matchSM").value;
  let lieuSM = document.getElementById("lieuSM").value;
  let joueur = document.getElementById("joueur").value;
  let set1SM = document.getElementById("set1SM").value;
  let set2SM = document.getElementById("set2SM").value;
  let set3SM = document.getElementById("set3SM").value;
  let set4SM = document.getElementById("set4SM").value;
  let scoreSM = document.getElementById("scoreSM").value;

  if(lieuSM.trim() != "" && joueur.trim() != "") {

      if(id < 0) {
          listData.push(addRowData(numberList, dateSM, tournoiSM, matchSM, lieuSM, 
            joueur, set1SM, set2SM, set3SM, set4SM, scoreSM));
          numberList++;
      } else {
          listData[rechercheKey(id)] = addRowData(id, dateSM, tournoiSM, matchSM, lieuSM, 
            joueur, set1SM, set2SM, set3SM, set4SM, scoreSM);
      }

      id = -1;

      addValueTab();

      annulerDef();

  } else {
      alert("Veuillez compléter tous les champs");
  }
})

function saveLocal() {
  let values = {
      "number" : numberList,
      "listData" : listData,

  }
  localStorage.setItem('scores', JSON.stringify(values));
}

function loadLocal() {
  var scores = localStorage.getItem('scores');
  if(scores !== undefined && scores != "") {
      let values = JSON.parse(scores);
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
          element.dateSM.toLowerCase().includes(find.toLowerCase()) ||
          element.tournoiSM.toLowerCase().includes(find.toLowerCase()) ||
          element.matchSM.toLowerCase().includes(find.toLowerCase()) ||
          element.lieuSM.toLowerCase().includes(find.toLowerCase()) || 
          element.joueur.toLowerCase().includes(find.toLowerCase()) || 
          element.set1SM.toLowerCase().includes(find.toLowerCase()) || 
          element.set2SM.toLowerCase().includes(find.toLowerCase()) || 
          element.set3SM.toLowerCase().includes(find.toLowerCase()) || 
          element.set4SM.toLowerCase().includes(find.toLowerCase()) || 
          element.scoreSM.toLowerCase().includes(find.toLowerCase())) {
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

