const { Player } = require("./player");

exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  var players          = new Array();

  var popQuestions     = new Array();
  var scienceQuestions = new Array();
  var sportsQuestions  = new Array();
  var rockQuestions    = new Array();

  var currentPlayer    = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return players[currentPlayer].purse != 6;
  };

  var currentCategory = function(){
    switch(players[currentPlayer].place) {
      case 0 : case 4 : case 8:
        return 'Pop';
      case 1 : case 5 : case 9 :
        return 'Science';
      case 2 : case 6 : case 10 :
        return 'Sports';
      default:
        return 'Rock';
    }
  };

  this.createRockQuestion = function(index){
    return "Rock Question "+index;
  };

  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push(this.createRockQuestion(i));
  };

  this.add = function(playerName){
    players.push(new Player(playerName));

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };


  var askQuestion = function(){
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };

  this.roll = function(roll){
    console.log(players[currentPlayer].name + " is the current player");
    console.log("They have rolled a " + roll);

    if(players[currentPlayer].inPenaltyBox){
      if(roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer].name + " is getting out of the penalty box");
        players[currentPlayer].place = players[currentPlayer].place + roll;
        if(players[currentPlayer].place > 11){
          players[currentPlayer].place = players[currentPlayer].place - 12;
        }

        console.log(players[currentPlayer].name + "'s new location is " + players[currentPlayer].place);
        console.log("The category is " + currentCategory());
        askQuestion();
      }else{
        console.log(players[currentPlayer].name + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      players[currentPlayer].place = players[currentPlayer].place + roll;
      if(players[currentPlayer].place > 11){
        players[currentPlayer].place = players[currentPlayer].place - 12;
      }

      console.log(players[currentPlayer].name + "'s new location is " + players[currentPlayer].place);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function(){
    if(players[currentPlayer].inPenaltyBox){
      if(isGettingOutOfPenaltyBox){
        console.log('Answer was correct!!!!');
        players[currentPlayer].purse += 1;
        console.log(players[currentPlayer].name + " now has " +
                    players[currentPlayer].purse  + " Gold Coins.");

        var winner = didPlayerWin();
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;

        return winner;
      }else{
        currentPlayer += 1;
        if(currentPlayer == players.length)
          currentPlayer = 0;
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      players[currentPlayer].purse += 1;
      console.log(players[currentPlayer].name + " now has " +
                  players[currentPlayer].purse  + " Gold Coins.");

      var winner = didPlayerWin();

      currentPlayer += 1;
      if(currentPlayer == players.length)
        currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function(){
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer].name + " was sent to the penalty box");
		players[currentPlayer].inPenaltyBox = true;

    currentPlayer += 1;
    if(currentPlayer == players.length)
      currentPlayer = 0;
		return true;
  };
};

/* var notAWinner = false;

this.playGame = function () {
  var game = new Game();

  game.add('Chet');
  game.add('Pat');
  game.add('Sue');

  do {

    game.roll(Math.floor(Math.random() * 6) + 1);

    if (Math.floor(Math.random() * 10) == 7) {
      notAWinner = game.wrongAnswer();
    } else {
      notAWinner = game.wasCorrectlyAnswered();
    }

  } while (notAWinner);
} */

