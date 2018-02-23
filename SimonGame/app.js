(function(){
	var app = angular.module('SimonGame',[]);

	app.controller('gameController',['$scope',function($scope){
		var rounds=0; //number or rounds played
		var moveIndex = 0; //index that shows player's current move
		var enemyMoves=[]; //array for enemy's moves sequence
		var playerMoves=[]; //array for players's moves sequence
		var move = 0; //counter for enemy's moves
		$scope.score = 0; //game score
		var startFlag=false; //flag to see if the game started
		var inProgress=false; //flag to see if enemy moves are in progress
		// var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
		// var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
		// var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
		// var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    
		$scope.startGame = function(){
			reset();
			enemyTurn();
			$scope.score = 0;
			startFlag = true;
			$(".btn").html("RESET");
		};
		
		function activateButton(btn){
			// 1:green  2:red  3:yellow  4:blue
			switch(btn){
				case 1:
					setTimeout(function(){$("#greenSlice").addClass("enemyGreen");},500);
					setTimeout(function(){$("#greenSlice").removeClass("enemyGreen");},1000);
         			setTimeout(function(){
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
					},450);
          			break;
 
				case 2:
					setTimeout(function(){$("#redSlice").addClass("enemyRed");},500);
					setTimeout(function(){$("#redSlice").removeClass("enemyRed");},1000);
					setTimeout(function(){
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
					},450);
					break;
					
				case 3:
					setTimeout(function(){$("#yellowSlice").addClass("enemyYellow");},500);
					setTimeout(function(){$("#yellowSlice").removeClass("enemyYellow");},1000);
					setTimeout(function(){
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
					},450);
					break;
					
				case 4:
					setTimeout(function(){$("#blueSlice").addClass("enemyBlue");},500);
					setTimeout(function(){$("#blueSlice").removeClass("enemyBlue");},1000);
					setTimeout(function(){
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
					},450)
					break;
				default: break;
			}
		}
		
		//toggle buttons for each enemy moves
		function toggle(){
			activateButton(enemyMoves[move]);
			if(move !== enemyMoves.length){
				setTimeout(toggle,800);
				move++;
			}
			else {
					move=0;
					inProgress = false;
				}
		}
		
		
		function enemyTurn(){
			// 1:green  2:red  3:yellow  4:blue
			var btn = Math.floor((Math.random()*4)+1);
			enemyMoves.push(btn);
			toggle();
			inProgress = true;
		}
		
		
		$scope.pressed = function(btn){
			if(startFlag && !inProgress){		
				// 1:green  2:red  3:yellow  4:blue
				switch(btn){
					case 1:
						playerMoves.push(1);
						console.log(playerMoves);
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
						$("#greenSlice").addClass("active");
						setTimeout(function(){$("#greenSlice").removeClass("active");},200);
						checkMove();
						break;
						
					case 2:
						playerMoves.push(2);
						console.log(playerMoves);
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
						$("#redSlice").addClass("active");
						setTimeout(function(){$("#redSlice").removeClass("active");},200);
						checkMove();
						break;
						
					case 3:
						playerMoves.push(3);
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
						$("#yellowSlice").addClass("active");
						setTimeout(function(){$("#yellowSlice").removeClass("active");},200);
						checkMove();
						break;
						
					case 4:
						playerMoves.push(4);
						new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
						$("#blueSlice").addClass("active");
						setTimeout(function(){$("#blueSlice").removeClass("active");},200);
						checkMove();
						break;
						
					default: break;
				}
			}
		};
		
		function checkMove(){
			//check if player's moves are the same with enemy's moves
			if(enemyMoves[moveIndex] == playerMoves[moveIndex]){
				moveIndex++;
			}
			
			//if 1 move is not the same game ends and resets
			else{
				reset();
				alert("You lost!");
			}
			
			//if the moveIndex reaches enemy's array length means the player's sequence is correct
			//update score,reset player's moves and the move counter
			if(moveIndex == enemyMoves.length && moveIndex !== 0){
				$scope.score++;
				moveIndex = 0;
				playerMoves = [];
				setTimeout(enemyTurn,1000);
			}
			else{
				console.log("nope"); //means you haven't pressed enough times
			}
		}
		
		
		function reset(){
			enemyMoves=[];
			playerMoves=[];
			$scope.score = 0;
			moveIndex = 0;
		}

	}]);
})()