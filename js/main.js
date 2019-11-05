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
var compShips = {
randCarrier: [null, null, null, null, null],
randBattleship: [null, null, null, null],
randCruiser: [null, null, null],
randSub: [null, null, null],
randDestroyer: [null, null]
}
/*Create the two game boards */
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var nums = [1,2,3,4,5,6,7,8,9,10];
var board1 = [];
var board2 = [];

/*Create gameboard array of all spaces*/ 
for(var i=1; i<=10; i++){
   letters.forEach(x => board1.push(x+i));
   letters.forEach(x => board2.push(x+i));
    }

/*create space elements on game boards*/
board1.forEach(x => {
    var newEl= document.createElement('div');
    newEl.classList.add('space');
    newEl.id='user-'+x;
    gameBoard1.appendChild(newEl);
});
board2.forEach(x => {
    var newEl= document.createElement('div');
    newEl.classList.add('space');
    newEl.id='comp-'+x;
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
        shipArray.splice(shipArray.indexOf(null), 1, clickedSpace.id.charAt(5)+clickedSpace.id.charAt(6));
    
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



/*define variables to help in setting up the ships*/
let compShipName = Object.keys(compShips);
let compShipIndex = 0;



/*function to getnerate random numbers and create ship placement */
function computerShipPlacement(){
   console.log(compShipName);
   var vertOrHor =2;
   var vertRandCol;
   var vertRandRow;
   var horRandCol;
   var horRandRow;
   var horColIndex;
   var compShipSpaces = [];
    for(compShipName in compShips){
       vertOrHor = Math.floor(Math.random() * 2 + 1);
        console.log(compShips[compShipName].length);
        /*Vertical Case */
        if(vertOrHor===1){        
            function vertical(){
            /*Pick random column and start of random row */ 
                vertRandCol = letters[Math.floor(Math.random() * 10)];
                /*Pick random row based on how long the ship is */
                vertRandRow = Math.floor(Math.random()*(11-compShips[compShipName].length)+1);
                /*iterate through the rand row to the length of the ship */
                for(i = vertRandRow; i<vertRandRow + compShips[compShipName].length; i++)
                {
                /*if the compShipSpaces array already contains the random generated
                space, then reset that ships array to all nulls and call the vertical
                function again so it can repick a new random loc */
                if(compShipSpaces.includes(`${vertRandCol}`+i)){
                    for(var j=0; j<compShips[compShipName].length; j++)
                        compShips[compShipName][j]=null;
                        vertical();
                    }
             /*fill array in compShips object for each ship with grid locations. Also push the taken space to the 
             compShipSpaces array so we know which spaces are no longer available.  */
                else {
                    compShips[compShipName].splice(compShips[compShipName].indexOf(null), 1, `${vertRandCol}`+i );
                    compShipSpaces.push(`${vertRandCol}`+i);
                }        
            }   
        }
        vertical();   
        }
        /*Horizontal Case */
        else {
            function horizontal(){
                horRandRow = Math.floor(Math.random()*10+1);
                horColIndex = Math.floor(Math.random()*(11-compShips[compShipName].length));
                horRandCol= letters[horColIndex];
                for(var i = horColIndex; i<horColIndex + compShips[compShipName].length; i++)
                {
                /*if the compShipSpaces array already contains the random generated
                space, then reset that ships array to all nulls and call the horizontal
                function again so it can repick a new random loc */
                console.log(`${letters[i]}`+`${horRandRow}`);
                if(compShipSpaces.includes(`${letters[i]}`+`${horRandRow}`)){
                    //compShips[compShipName].splice(compShips[compShipName].indexOf(null), 1, `${letters[i]}`+`${horRandRow}`);
                    for(var j=0; j<compShips[compShipName].length; j++) {
                        compShips[compShipName][j]=null;  
                    }
                        horizontal();
                    }
                /*fill array in compShips object for each ship with grid locations
                 Also push the taken space to the 
                compShipSpaces array so we know which spaces are no longer available.  */
                else {
                    compShips[compShipName].splice(compShips[compShipName].indexOf(null), 1, `${letters[i]}`+`${horRandRow}` );
                    compShipSpaces.push(`${letters[i]}`+`${horRandRow}`);
                }        
                }   
            }
            
        horizontal();
        }
    }
/*color the spaces in the compShip object black*/
for(compShipName in compShips){

    compShips[compShipName].forEach(x=>{  
           document.getElementById('comp-'+x).style.backgroundColor = 'black';
    })
}
console.log(compShips);    
}

computerShipPlacement();
playersTurn();
var checkWinnerArray = [];

/*make function for player to be able to fire on comp ships */
function playersTurn(){

gameBoard2.addEventListener('click', compBoardClick);

/*Create a click function that changes the comp board*/
function compBoardClick(evt) {
    var clickedSpace = evt.target;
    var clickedId= clickedSpace.id.charAt(5)+clickedSpace.id.charAt(6);
    console.log(clickedId);
    for(compShipName in compShips){
        for(i=0; i<compShipName.length; i++)
        {
            if(clickedId===compShips[compShipName][i])
            {
                console.log("hit")
                clickedSpace.style.backgroundColor='red';
                compShips[compShipName][i]='hit';
            }  
        }
        if(compShips[compShipName].every(x=> {
            return x==='hit' })){
               console.log(compShipName + ' sunk');
               checkWinnerArray.push(compShipName);
            }
           /*change you won alert to message on board */ 
        if(checkWinnerArray.includes('randCarrier'&&'randDestroyer'&&
        'randSub'&&'randBattleship'&&'randCruiser')){
            window.alert("You Won!!!!");
        }
    
        
    }
  
    if(clickedSpace.style.backgroundColor !== 'red'){
        clickedSpace.style.backgroundColor ='white';
        console.log('miss');
    }
    

}
}
