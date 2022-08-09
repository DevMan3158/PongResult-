let favDialog = document.getElementById('favDialog');
let selectEl = document.querySelector('select');
let updateButton = document.getElementById('modifier');
let confirmBtn = document.getElementById('confirmer');
let outputBox = document.querySelector('output');



// Le bouton "Mettre à jour les détails" ouvre le <dialogue> ; modulaire

updateButton.addEventListener('click', function onOpen() 
{
  if (typeof favDialog.showModal === "function") {
    favDialog.showModal();

  } else {
    console.error("L'API <dialog> n'est pas prise en charge par ce navigateur.");
  }
});

// L'entrée définit la valeur du bouton d'envoi.
selectEl.addEventListener('change', function onSelect(e) {
  confirmBtn.value = selectEl.value;
});

localStorage.selectEl

// Le bouton "Confirmer" du formulaire déclenche la fermeture
// de la boîte de dialogue en raison de [method="dialog"]
/*favDialog.addEventListener('close', function onClose() {
  outputBox.value = favDialog.returnValue + " bouton cliqué - " + (new Date()).toString();
});*/
