
var cardlist = ["black.png", "white.png", "tan.png", "fortegreen.png", "cyan.png", "lime.png", "purple.png", "green.png"];
var totaalpaaren = cardlist.length;
var gemaaktepaaren = 0;
var deck = [] ;
cardlist = cardlist.concat(cardlist);
var pickedcard;
var selectindex;
var card1 = -1;
var card2 = -1;
var timeout = -1;
var move = 0;

function shuffeldeck(){
    while (cardlist.length > 0) {
       selectindex = Math.floor(Math.random()*cardlist.length);
       pickedcard = cardlist.splice(selectindex, 1);
      deck.push(pickedcard[0]);
    }
}

function createdeck(){
    var i,j; 
    var text = "";
    console.log(deck[0]);

    j=1;
    for (i = 0; i < deck.length; i++) {
        document.getElementById("box"+j).innerHTML = "<img src='/project/memmory/images/"+ deck[i] + "'/>" ;
        j++;
    }
    document.getElementById("demo").innerHTML = text;   
}

function checkpairs( index ) {
    console.log( "checkpairs index", index );
    if (iscardopen(index) == true) return
    if (timeout != -1) return        // speler mag niks doen 
    if ( card1 == -1 ) {             // Nog geen enkele kaart open
        card1 = index;               // ..dus card1 wordt gelijk aan index
        opencard(card1)
        console.log( "card1", card1, "deck[ card1 ]", deck[ card1 ] );
    } else {                         // Kaart was al open, dus nu is kaart 2 geclicked
        if(card1 == index) return;   // de zelfde kaart is geklikt 

        card2 = index;               // ..dus card2 wordt gelijk aan index
        console.log( "card2", card2, "deck[ card2 ]", deck[ card2 ] );
                                     // vergelijk de plaatjes van de twee kaarten
        opencard(card2)
        if ( deck[ card1 ] == deck[ card2 ] ) { 
            console.log('ze zijn gelijk')    // ze zijn gelijk!
            gemaaktepaaren  = gemaaktepaaren +1;
            console.log(gemaaktepaaren);
            if (gemaaktepaaren == totaalpaaren) {
                console.log("je hebt gewonnen");
            }
            card1 = -1;
            card2 = -1;
            move = move +1;
            console.log(move, "Dit is je aantal setten");
        }else{
            timeout = setTimeout(closeall, 1500); 
        }
    }
}
function closeall(){
    closecard(card1)
    closecard(card2)
    card1 = -1;
    card2 = -1;
    timeout = -1;
    move = move +1;
    console.log(move, "Dit is je aantal setten");
}
function opencard(card){
    var cardelement = document.getElementById("box" + (card +1));
    var cardimg = cardelement.getElementsByTagName('img')[0];
    cardimg.style.display = "block";
}
function closecard(card){
    var cardelement = document.getElementById("box" + (card +1));
    var cardimg = cardelement.getElementsByTagName('img')[0];
    cardimg.style.display = "none";
}
function iscardopen(card){
    var cardelement = document.getElementById("box" + (card +1));
    var cardimg = cardelement.getElementsByTagName('img')[0];
    if (cardimg.style.display == "block") {
        return true
    } else {
        return false
    }
}
shuffeldeck();
createdeck();