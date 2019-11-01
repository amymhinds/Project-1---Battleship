/* Cached Elements*/ 
var gameBoard1= document.getElementById('grid-1');
var gameBoard2=document.getElementById('grid-2');
const playButton = document.getElementById('play');


/* initialize user ship arrays*/ 
var userShips = {
carrier: [null, null, null, null, null],
battleship: [null, null, null, null],
cruiser: [null, null, null],
sub: [null, null, null],
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
/*define variables to help in setting up the ships*/
let shipName = Object.keys(userShips);
let shipIndex = 0;

/*Adding an event listener to the gameBoard1*/
gameBoard1.addEventListener('click', shipClick);

/*Create a click function that changes the  */
function shipClick(evt) {
    let shipArray = userShips[shipName[shipIndex]];
    var clickedSpace = evt.target;
    clickedSpace.style.backgroundColor= 'black';
    /*takes the first null in the ship array and replaces it with the id
    of the clicked square */
    shipArray.splice(shipArray.indexOf(null), 1, clickedSpace.id);
    /*Once there are no more nulls in the array, move on to the next ship
    by increasing the index in the usership object
    Also add a note to the user to set the next ship */
    if (shipArray[shipArray.length - 1] !== null) {
        shipIndex++;
        document.getElementById(`${shipName[shipIndex]}`).style.display='block';
    }
};