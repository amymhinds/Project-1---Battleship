/* Cached Elements*/ 
var gameBoard1= document.getElementById('grid-1');
var gameBoard2=document.getElementById('grid-2');
const playButton = document.getElementById('play');


/* initialize user ship arrays*/ 
var userShips = {
carrier: [null, null, null, null, null],
battleship: [null, null, null, null],
cruiser: [null, null, null],
submarine: [null, null, null],
destroyer: [null, null]
}


/*Create the two game boards */
var letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var nums = [1,2,3,4,5,6,7,8,9,10];
var board1=[];
var board2=[];

/*Create gameboard array of all spaces*/ 
for(var i=1; i<=10; i++){
   letters.forEach(x => board1.push(x+i));
   letters.forEach(x => board2.push(x+i));
    }

/*create space elements on game boards*/
board1.forEach(x => {
    var newEl= document.createElement('div');
    newEl.classList.add('space');
    newEl.id=x;
    gameBoard1.appendChild(newEl);
});
/*add event listener on each square*/
// document.getElementById('space').forEach(x=>{
//     x.addEventListener('click', clickSquare);
// })
/*Set display to none for setting ships*/
function init(){
    document.getElementById('carrier').style.display = "none";
    document.getElementById('battleship').style.display = "none";
    document.getElementById('cruiser').style.display = "none";
    document.getElementById('sub').style.display = "none";
    document.getElementById('destroyer').style.display = "none";

}
init();

playButton.addEventListener('click', handleClick);
function handleClick(evt){
    init();
    document.getElementById('carrier').style.display = "block";

}
// function clickSquare(evt){
//     console.log('clicked');
// }



for(ship in userShips){
    gameBoard1.addEventListener('click', shipClick);
     
}

function shipClick(evt) {
   
        var clickedSpace = evt.target;
        clickedSpace.style.backgroundColor= 'black';
        ship.splice(i, 1, clickedSpace.id);
    
    
    if(ship[ship.length-1] !== null){
        gameBoard1.removeEventListener('click', shipClick);
        gameBoard1.addEventListener('click', shipClick);
        
    }
};







// //add event listener on grid-1 "onclick"
// gameBoard1.addEventListener('click', carrier);

// function carrier(evt){
//     // update gameboard with evt.target (space)
//     var clickedSpace = evt.target;
//     clickedSpace.style.backgroundColor= 'black';
//     // update carrier array with the targets value A1...
//     carrierArray.push(clickedSpace.id);
//     // if the carrier is five spaces long, remove evt listener for 
//     //carrier and add battleship listener
//     if(carrierArray.length===5){
//         gameBoard1.removeEventListener('click', carrier);
//         gameBoard1.addEventListener('click', battleship);
//     }
// }

// function battleship(evt){
//     var clickedSpace = evt.target;
//     clickedSpace.style.backgroundColor= 'black';
//     carrierArray.push(clickedSpace.id);
//     if(carrierArray.length===4){
//         gameBoard1.removeEventListener('click', battleship);
//         gameBoard1.addEventListener('click', cruiser);
//     }
// }

// function cruiser(evt){
//     var clickedSpace = evt.target;
//     clickedSpace.style.backgroundColor= 'black';
//     carrierArray.push(clickedSpace.id);
//     if(carrierArray.length===4){
//         gameBoard1.removeEventListener('click', cruiser);
//         gameBoard1.addEventListener('click', sub);
//     }
// }
// function cruiser(evt){
//     var clickedSpace = evt.target;
//     clickedSpace.style.backgroundColor= 'black';
//     carrierArray.push(clickedSpace.id);
//     if(carrierArray.length===4){
//         gameBoard1.removeEventListener('click', cruiser);
//         gameBoard1.addEventListener('click', sub);
//     }
// }








    
