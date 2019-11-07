/* Cached Elements*/ 
var gameBoard1= document.getElementById('grid-1');
var gameBoard2=document.getElementById('grid-2');
const playButton = document.getElementById('play');
var playerHeader = document.getElementById('playerGridTitle');
var compHeader = document.getElementById('compGridTitle');
var newGame;
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
    compHeader.style.display = "none";
    gameBoard1.style.display ='';

    
}
init();

/*start the game*/
playButton.addEventListener('click', handleClick);

function handleClick(evt){
    init();
    document.getElementById('carrier').style.display = "block";
    /*this event listener allows user to set ship posiitions */
    gameBoard1.addEventListener('click', shipClick);
}
/*define variables to help in setting up the ships*/
let shipName = Object.keys(userShips);
let shipIndex = 0;
/*Create a click function on the comp board for user to click
a grid space, and place their ships */
var placement;

function shipClick(evt) {
    let shipArray = userShips[shipName[shipIndex]];
    var clickedSpace = evt.target;
    var rowNum=clickedSpace.id.charAt(6)+clickedSpace.id.charAt(7);

    var clickedSpaceId = clickedSpace.id.charAt(5)+clickedSpace.id.charAt(6)+clickedSpace.id.charAt(7);
    var clickedSpaceIdIndex = board1.indexOf(clickedSpaceId);


    if(clickedSpace.style.backgroundColor !== 'black'){
        //clickedSpace.style.backgroundColor= 'black';
      
       if(shipArray[0]===null){
        clickedSpace.style.backgroundColor= 'black';
       }
        /*if the second index is being filled in the ship array (determines if 
        user is choosing to place vertical or horizontal)*/
        if(shipArray[0]!==null && shipArray[1]===null)
        {   
           
            if(((parseInt(shipArray[0].charAt(1)+shipArray[0].charAt(2))===parseInt(rowNum)+1 && 
                shipArray[0].charAt(0)===clickedSpaceId.charAt(0))||
                parseInt(shipArray[0].charAt(1))===parseInt(rowNum)-1
                && shipArray[0].charAt(0)===clickedSpaceId.charAt(0))
                // or if it is horizontal one space
                || (
                 (board1.indexOf(shipArray[0]) ===clickedSpaceIdIndex -1 ) ||
                 (board1.indexOf(shipArray[0]) ===clickedSpaceIdIndex +1)))
                {
                    clickedSpace.style.backgroundColor= 'black';      
                }
            
            if((parseInt(shipArray[0].charAt(1)+shipArray[0].charAt(2))===parseInt(rowNum)+1 && 
            shipArray[0].charAt(0)===clickedSpaceId.charAt(0))||
            parseInt(shipArray[0].charAt(1)+shipArray[0].charAt(2))===parseInt(rowNum)-1
            && shipArray[0].charAt(0)===clickedSpaceId.charAt(0)) {
                placement='vertical';
            }
            else{

                placement="horizontal";
            }
        }

        /*takes the first null in the ship array and replaces it with the id
        of the clicked square */

        if(placement==='vertical' && shipArray[1]!==null){
 

            shipArray.forEach(x=>{
                if(x === null){
                   
                }
                else if(((parseInt(x.charAt(1)+x.charAt(2)) === parseInt(rowNum)+1)
                && x.charAt(0)===clickedSpaceId.charAt(0)) ||
                ((parseInt(x.charAt(1)+x.charAt(2)) === parseInt(rowNum)-1)
                && x.charAt(0)===clickedSpaceId.charAt(0))){
                    clickedSpace.style.backgroundColor='black';
                }
            }
            )
        }

        if(placement==='horizontal' && shipArray[1]!==null){
         

             shipArray.forEach(x=>{
                 if(x === null){
                    
                 }
                 else if(((board1.indexOf(x) === board1.indexOf(clickedSpaceId)+1)
                 && x.charAt(1)+x.charAt(2)===rowNum) ||
                 ((board1.indexOf(x) === board1.indexOf(clickedSpaceId)-1)
                 && x.charAt(1)+x.charAt(2)===rowNum)){
                     clickedSpace.style.backgroundColor='black';
                 }
             }
             )
         }




        console.log('placement' + placement);

        if(clickedSpace.style.backgroundColor==='black'){
            shipArray.splice(shipArray.indexOf(null), 1, clickedSpaceId);
            }

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
    /*remove event listener so after user clicks play they cant click again */
    playButton.removeEventListener('click', handleClick);
};
/*Add event listener on fire button so player can fire on comp's ships*/
document.getElementById('compBoard').addEventListener('click', toggleToCompBoard);
/*this function hides the player board and toggles to the comp board*/
function toggleToCompBoard(evt){
    gameBoard1.style.display = "none";
    gameBoard2.style.display = "";
    compHeader.style.display = "";
    playerHeader.style.display = "none";
}
/*define variables to help in setting up the ships*/
let compShipName = Object.keys(compShips);
let compShipIndex = 0;

/*function to getnerate random numbers and create 
Computer ship placement */
var vertOrHor =2;
var vertRandCol;
var vertRandRow;
var horRandCol;
var horRandRow;
var horColIndex;
var compShipSpaces = [];
function computerShipPlacement(){
    for(compShipName in compShips){
        vertOrHor = Math.floor(Math.random() * 2 + 1);
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
    /*color the spaces in the compShip object black
    for developers ease to guess and test game.
    Will comment out when playing game*/
    for(compShipName in compShips){
        compShips[compShipName].forEach(x=>{  
           document.getElementById('comp-'+x).style.backgroundColor = 'black';
        })
    }  
/*After comp ship place ships, call players turn function*/
console.log('compshipplacement');
    playersTurn(); 
    newGame = true;
}

/*invoke comp ship placement*/
computerShipPlacement();

var checkWinnerArray = [];
/*make function for player to be able to fire on comp ships */
function playersTurn(){
    // gameBoard1.style.display = "none";
    // gameBoard2.style.display = "";
    console.log('players turn');
    gameBoard2.addEventListener('click', compBoardClick);
    /*Create a click function that changes the comp board*/
   
    
}


function compBoardClick(evt) {
    console.log('compboardclick');
    var clickedSpace = evt.target;
    var clickedId= clickedSpace.id.charAt(5)+clickedSpace.id.charAt(6);
    for(compShipName in compShips){
        for(i=0; i<compShipName.length; i++){
            if(clickedId===compShips[compShipName][i]){
                clickedSpace.style.backgroundColor='red';
                compShips[compShipName][i]='hit';
            }  
         }
        if(compShips[compShipName].every(x=> {
            return x==='hit' })){
            checkWinnerArray.push(compShipName);
        }
       /*change you won alert to message on board */ 
        if(checkWinnerArray.includes('randCarrier')&&
            checkWinnerArray.includes('randDestroyer') &&
            checkWinnerArray.includes('randCruiser') &&
            checkWinnerArray.includes('randBattleship') &&
            checkWinnerArray.includes('randSub')){
                window.alert("You Won!!!!");
        }
    }   
    if(clickedSpace.style.backgroundColor !== 'red'){
        clickedSpace.style.backgroundColor ='white';
    }
/*make it so that when it switches to the computers turn and the players board,
there will be a slight delay */
    gameBoard2.removeEventListener('click', compBoardClick);
    setTimeout(compTurn, 2000); 

}


/*Make the computer's turn function */
/*Define variables below */
// var compHits = [];
// var compMisses= [];
var countTurn = 0;
var countTurnArray = [];
var compGuessArray = [];
var randGuess;
var compGuess;
var compCheckWinnerArray= [];
var hitVal='';

function compTurn() {
    countTurn+=1;
    gameBoard1.style.display = "";
    gameBoard2.style.display = "none";
    playerHeader.style.display = "";
    compHeader.style.display = "none";
    randGuess = board2[Math.floor(Math.random() * 100)];
    compGuess = document.getElementById('user-'+randGuess);
    for(ShipName in userShips){
        //if the previous guess was not a hit or was sunk
        if(countTurnArray[countTurn-1]!=="hit"||countTurnArray[countTurn-1]==="hit&sunk"){

        for(i=0; i<ShipName.length; i++){
            /*Color red if its a hit */
            if(randGuess===userShips[ShipName][i]){
                compGuess.style.backgroundColor='red';
                userShips[ShipName][i]='hit';
                hitVal='hit';
                countTurnArray.push(hitVal);
            }  
        }

        }
        /*if last turn was a hit that did not sink a ship and if the one before that was a miss
            (saying it didnt figure out direction yet of vertical ship or horizontal*/
        if(countTurnArray[countTurn-1]==="hit"&& countTurnArray[countTurn-1]!=="hit&sunk"&&
        countTurnArray[countTurn-2]==="miss"){
            //guess anywhere directly adjacent
            //figure out direction
            //if it is not a border element, guess anywhere within the four possibilities
            if(compGuessArray[countTurn-2].charAt(0)!=='A' || compGuessArray[countTurn-2].charAt(0)!=='J' ||
            compGuessArray[countTurn-2].charAt(1)!=='1'){
                //random num one and four
                randDirection = Math.floor(Math.random()*4+1);
                //vertical up
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical down
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //horizontal right
                else if(randDirection ===3){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //horizontal left
                else{
                        randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-1];
                        compGuess=document.getElementById('user-'+ randGuess);
                }

            }
            //if it is  a border element in column A and not a corner (1 or 10)
           else if(compGuessArray[countTurn-2].charAt(0)==='A' && compGuessArray[countTurn-2].charAt(1)!=='1'){
                //random num one and four
                randDirection = Math.floor(Math.random()*3+1);
                //vertical up
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical down
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //horizontal right
                else if(randDirection ===3){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
            }
            //if it is a border Element in column J and not a corner (1 or 10)
            else if(compGuessArray[countTurn-2].charAt(0)==='J' && compGuessArray[countTurn-2].charAt(1)!=='1'){
                //random num one and four
                randDirection = Math.floor(Math.random()*3+1);
                //vertical up
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical down
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //horizontal left
                else if(randDirection ===3){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
            }
             //if it is a bottom row 10 element and not a corner (not A or J)
             else if(compGuessArray[countTurn-2].charAt(2)==='0' && (compGuessArray[countTurn-2].charAt(0)!=='A'
             ||compGuessArray[countTurn-2].charAt(0)!=='J'))
                {
                //random num one and four
                randDirection = Math.floor(Math.random()*3+1);
                //horizontal right
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical up
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //horizontal left
                else if(randDirection ===3){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
            }
            //else if top row element and not corner
            else if(compGuessArray[countTurn-2].charAt(1)==='1' && (compGuessArray[countTurn-2].charAt(0)!=='A'
             ||compGuessArray[countTurn-2].charAt(0)!=='J'))
                {
                //random num one and four
                randDirection = Math.floor(Math.random()*3+1);
                //horizontal right
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical down
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //horizontal left
                else if(randDirection ===3){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
            }

            //if corner A1
            else if (compGuessArray[countTurn-2]==='A1'){
                randDirection =Math.floor(random()*2+1);
                //horizontal right
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical down
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
            }

            //if corner A10
            else if (compGuessArray[countTurn-2]==='A10'){
                randDirection =Math.floor(random()*2+1);
                //horizontal left
                if(randDirection ===1){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])-1];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
                //vertical down
                else if(randDirection ===2){
                    randGuess=board2[board2.indexOf(compGuessArray[countTurn-2])+10];
                    compGuess=document.getElementById('user-'+ randGuess);
                }
            }





            



        }





            /*if the ship array in the userShips object is completely hit, it is sunk */
            if(userShips[ShipName].every(x=> {
                return x==='hit' })){
                   checkCompWinnerArray.push(ShipName);
                   hitVal='hit&sunk';
                   countTurnArray.push(hitVal);

                }
            /*change you won alert to message on board
            if the winner array contains all ships, comp won */ 
            if(compCheckWinnerArray.includes('carrier')&&
            compCheckWinnerArray.includes('destroyer') &&
            compCheckWinnerArray.includes('cruiser') &&
            compCheckWinnerArray.includes('battleship') &&
            compCheckWinnerArray.includes('sub')){
                window.alert("Comp Won");
            }
    


if(compGuess.style.backgroundColor !== 'red'){
    compGuess.style.backgroundColor ='white';
    /*only push miss if the last one was not a hit...
    important in case you miss multiple times guessing adjacent to a cell*/
    if(countTurnArray[countTurn-1]!=='hit'){
        hitVal='miss';
        countTurnArray.push(hitVal);
    }
    
    }
    compGuessArray.push(randGuess);

}

console.log('compTurnArray ' + countTurnArray);
console.log('compTurn ' +countTurn);
    /*Invoke players turn so that at the end of comp turn the player can click 
    fire on enemy and play */
playersTurn();
}

function smartComp(){

}


/*Reset Button */
document.getElementById('reset').addEventListener('click', reset)
function reset()
{
    
    console.log('reset');
    
    document.querySelectorAll('.space').forEach(x=>{
        x.style.backgroundColor='transparent';
    })
    compHits = [];
    compMisses= [];
    compCheckWinnerArray= [];
    checkWinnerArray = [];
    compShipSpaces = [];
    compShipIndex = 0;
    shipIndex = 0;
    userShips = {
        carrier: [null, null, null, null, null],
        battleship: [null, null, null, null],
        cruiser: [null, null, null],
        sub: [null, null, null],
        destroyer: [null, null]
        }
        
        /* Initialize random computer ships */
    compShips = {
        randCarrier: [null, null, null, null, null],
        randBattleship: [null, null, null, null],
        randCruiser: [null, null, null],
        randSub: [null, null, null],
        randDestroyer: [null, null]
        }
        playButton.addEventListener('click', handleClick);
        init();
        countTurn=0;
        countTurnArray = [];
        compGuessArray = [];
        console.log(document.getElementById('user-A1'));
       
        newGame=true;

        for(i=0;i<100;i++){
        if(document.getElementById(`user-${board1[i]}`).style.backgroundColor !== 'black'){
        document.getElementById(`user-${board1[i]}`).style.backgroundColor = 'transparent';    
        }
        }
        computerShipPlacement();
}
      
