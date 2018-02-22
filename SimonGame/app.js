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
		/*var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
		var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
		var yellowSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
		var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");*/
		
		function activateSound(){
			$("#gs").trigger('play');
			$("#rs").trigger('play');
			$("#ys").trigger('play');
			$("#bs").trigger('play');
		}
		
    
		$scope.startGame = function(){
			reset();
			enemyTurn();
			$scope.score = 0;
			startFlag = true;
		};
		
		function activateButton(btn){
			// 1:green  2:red  3:yellow  4:blue
			switch(btn){
				case 1:
					setTimeout(function(){$("#greenSlice").addClass("enemyGreen");},500);
					setTimeout(function(){$("#greenSlice").removeClass("enemyGreen");},1000);
					// $("#gs").trigger('play');
					// setTimeout(function(){
						// $("#gs").trigger('pause');
					    // $("#gs").prop("currentTime",0);
					// },700);
					break;
				case 2:
					setTimeout(function(){$("#redSlice").addClass("enemyRed");},500);
					setTimeout(function(){$("#redSlice").removeClass("enemyRed");},1000);
					//document.getElementById('rs').play();
					break;
				case 3:
					//yellowSound.currentTime = -0.1;
					setTimeout(function(){$("#yellowSlice").addClass("enemyYellow");},500);
					setTimeout(function(){$("#yellowSlice").removeClass("enemyYellow");},1000);
					//yellowSound.play();
					break;
				case 4:
					//blueSound.currentTime = 0;
					setTimeout(function(){$("#blueSlice").addClass("enemyBlue");},500);
					setTimeout(function(){$("#blueSlice").removeClass("enemyBlue");},1000);
					//blueSound.play();
					break;
			}
		}
		
		//toggle buttons for each enemy moves
		function toggle(){
			//stopAudio();
			activateButton(enemyMoves[move]);
			if(move !== enemyMoves.length){
				setTimeout(toggle,700);
				move++;
			}
			else move=0;
		}
		
		
		function enemyTurn(){
			// 1:green  2:red  3:yellow  4:blue
			var btn = Math.floor((Math.random()*4)+1);
			enemyMoves.push(btn);
			toggle();
		}
		
		
		$scope.pressed = function(btn){
			if(startFlag){		
				// 1:green  2:red  3:yellow  4:blue
				switch(btn){
					case 1:
						playerMoves.push(1);
						console.log(playerMoves);
						$("#greenSlice").addClass("active");
						setTimeout(function(){$("#greenSlice").removeClass("active");},200);
						checkMove();
						break;
					case 2:
						playerMoves.push(2);
						console.log(playerMoves);
						$("#redSlice").addClass("active");
						setTimeout(function(){$("#redSlice").removeClass("active");},200);
						checkMove();
						break;
					case 3:
						playerMoves.push(3);
						$("#yellowSlice").addClass("active");
						setTimeout(function(){$("#yellowSlice").removeClass("active");},200);
						checkMove();
						break;
					case 4:
						playerMoves.push(4);
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