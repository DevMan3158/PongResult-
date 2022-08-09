/*onglets*/
$(function() {
  $("#tabs").tabs();
} );



/*flouter*/
$( "#jA" ).first().click(function() {
    $( this ).fadeTo( "slow", 0.33 );
  });
$( "#jB" ).first().click(function() {
    $( this ).fadeTo( "slow", 0.33 );
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
            "#132552",
            "red",
            "yellow",
            "orange",
            "pink",
        ],
        hoverBorderWidth: 3,
        },
    ],
    },
    options:{
        title: {
            display: true,
            text: "Les 5 joueurs au podium",
            fontSize: 20,
        },
    legend: {
        display: true,
    }   
    }
});

