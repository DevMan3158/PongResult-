/*ajouter un match*/
function AddElement(event) {
       {
    event.preventDefault();

    let IdElement = document.getElementById("ajoutrang");
    console.log(IdElement.value);

    let ligne = document.createElement('tr');
    let cellule = document.createElement('td');

    cellule.innerHTML = IdElement.value;
    ligne.appendChild(cellule);

    let Idtable = document.getElementById("body");

    Idtable.appendChild(ligne);
    }
    {
        event.preventDefault();
        let IdElement = document.getElementById("ajoutclassementO");
console.log(IdElement.value);

let ligne = document.createElement('tr');
let cellule = document.createElement('td');

cellule.innerHTML = IdElement.value;
ligne.appendChild(cellule);

let Idtable = document.getElementById("body");

Idtable.appendChild(ligne);
    }
    {       
         event.preventDefault();
let IdElement = document.getElementById("ajoutpoints");
console.log(IdElement.value);let ligne = document.createElement('tr');
let cellule = document.createElement('td');

cellule.innerHTML = IdElement.value;
ligne.appendChild(cellule);

let Idtable = document.getElementById("body");

Idtable.appendChild(ligne);
    }
    {
        event.preventDefault();
    
        let IdElement = document.getElementById("ajoutjoueur");
        console.log(IdElement.value);
    
        let ligne = document.createElement('tr');
        let cellule = document.createElement('td');
    
        cellule.innerHTML = IdElement.value;
        ligne.appendChild(cellule);
    
        let Idtable = document.getElementById("body");
    
        Idtable.appendChild(ligne);
        }
        {
            event.preventDefault();
            let IdElement = document.getElementById("ajoutclub");
    console.log(IdElement.value);
    
    let ligne = document.createElement('tr');
    let cellule = document.createElement('td');
    
    cellule.innerHTML = IdElement.value;
    ligne.appendChild(cellule);
    
    let Idtable = document.getElementById("body");
    
    Idtable.appendChild(ligne);
        }
        {       
             event.preventDefault();
    let IdElement = document.getElementById("ajoutpays");
    console.log(IdElement.value);let ligne = document.createElement('tr');
    let cellule = document.createElement('td');
    
    cellule.innerHTML = IdElement.value;
    ligne.appendChild(cellule);
    
    let Idtable = document.getElementById("body");
    
    Idtable.appendChild(ligne);
        } 
}

bouton.onclick = () =>{
    localStorage.setItem("ajoutrang",ajoutrang.value);
    localStorage.setItem("ajoutclassementO",ajoutclassementO.value);
    localStorage.setItem("ajoutpoints",ajoutpoints.value);
    localStorage.setItem("ajoutjoueur",ajoutjoueur.value);
    localStorage.setItem("ajoutclub",ajoutclub.value);
    localStorage.setItem("ajoutpays",ajoutpays.value);
}












