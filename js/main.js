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

/* Initialize random computer ships */
var randCarrier = [];
var randBattleship = [];
var randCruiser = [];
var randSub=[];
var randDestroyer=[];

/*Create the two game boards */
var letters= ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var nums = [1,2,3,4,5,6,7,8,9,10];
var board1=[];
var board2=[];
/*Make an array for the indices possible for the center of the carrier.
  This is C3-C8 by H3-H8 on the grid. If the random center is generated
  within this area, the carrier (5 spaces) will be able to fit on the board.*/
/*22-28 are the indices of C3-C8 */
var compCarrier = [22,23,24,25,26,27];
var carrierIndices = [];
for (var i=0; i<6; i++){
    compCarrier.forEach(x=>{
        carrierIndices.push(x+10*i);
    })
}
/*make array of entire grid minus one row for all other ships to be placed on the board */
/*these are the indices of B2 to I2 */
var gridLessOneRow = [11,12,13,14,15,16,17,18];
var otherShipIndices = [];
for(var i=0; i<8; i++){
    gridLessOneRow.forEach(x=>{
        otherShipIndices.push(x+10*i);
    })
}


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
board2.forEach(x => {
    var newEl= document.createElement('div');
    newEl.classList.add('space');
    newEl.id=x;
    gameBoard2.appendChild(newEl);
});

/*Set display to none for setting ships*/
function init(){
    document.getElementById('carrier').style.display = "none";
    document.getElementById('battleship').style.display = "none";
    document.getElementById('cruiser').style.display = "none";
    document.getElementById('sub').style.display = "none";
    document.getElementById('destroyer').style.display = "none";
    document.getElementById('compBoard').style.display = "none";
    gameBoard2.style.display = "none";
}
init();

/*start the game*/
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
    if(clickedSpace.style.backgroundColor !== 'black'){
        clickedSpace.style.backgroundColor= 'black';
        /*takes the first null in the ship array and replaces it with the id
        of the clicked square */
        shipArray.splice(shipArray.indexOf(null), 1, clickedSpace.id);
    
        /*Once there are no more nulls in the array, move on to the next ship
        by increasing the index in the usership object
        Also add a note to the user to set the next ship */
        if (shipArray[shipArray.length - 1] !== null) {
            shipIndex++;
            /* remove event listener when all ships placed */
            if (shipIndex>4)
                {
                    gameBoard1.removeEventListener('click', shipClick);
                    document.getElementById('carrier').style.display = "none";
                    document.getElementById('battleship').style.display = "none";
                    document.getElementById('cruiser').style.display = "none";
                    document.getElementById('sub').style.display = "none";
                    document.getElementById('destroyer').style.display = "none";
                    document.getElementById('compBoard').style.display = "block";
                    return;
                }
            document.getElementById(`${shipName[shipIndex]}`).style.display='block';
        }
    }

};
/*Add event listener on beginning fire button */
document.getElementById('compBoard').addEventListener('click', toggleToCompBoard);

/*this function hides the player board and toggles to the comp board*/
function toggleToCompBoard(evt){
    gameBoard1.style.display = "none";
    gameBoard2.style.display = "";
}
function toggleToPlayerBoard(){
    gameBoard1.style.display = "";
    gameBoard2.style.display = "none";
}

/*function to getnerate random numbers and create ship placement */
function computerShipPlacement(){
    /*function to create center of the Carrier */
    randCarrier = carrierIndices[Math.floor(Math.random() * carrierIndices.length)];
    document.getElementById(`${board2[randCarrier]}`).style.backgroundColor = 'black';
    /* either one or two. if one, vertical, if 2 horizontal ship placement */
    var vertOrHor = Math.floor(Math.random() * 2 + 1)
    console.log(vertOrHor);
    

}
computerShipPlacement();