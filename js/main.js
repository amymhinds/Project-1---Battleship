/* Cached Elements*/ 
gameBoard1= document.getElementById('grid-1');

gameBoard2=document.getElementById('grid-2');
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


    
