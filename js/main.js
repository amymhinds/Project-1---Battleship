/* Cached Elements*/ 
var gameBoard1= document.getElementById('grid-1');
var gameBoard2=document.getElementById('grid-2');
const playButton = document.getElementById('play');


/* initialize user ship object*/ 
var userShips = {
carrier: [],
battleship: [],
cruiser: [],
submarine: [],
destroyer: []}

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









//add event listener on grid-1 "onclick"

function carrier(evt){
    // update gameboard with evt.target (space)
    // update carrier array with the targets value A1...
    // if statement length >= 5
        // grid-1 .removeEvenrListener('click', carrier)
        // grid-1.addefyfgfg('click', battleship)
        document.getElementById('battlship').style.display = "block";
}




document.
    
