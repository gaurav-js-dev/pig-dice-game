/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, lastRoundScore, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
    if (gamePlaying) {
        //1. Obtain a random number for dice
        var diceRandom = Math.floor(Math.random() * 6) + 1;

        //2. Display on UI
        var diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = `dice-${diceRandom}.png`;

        if (diceRandom !== 1) {
            // update the round score and keep the game playing if score is not 1    
            roundScore += diceRandom;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;

        } else {
            nextPlayer();
        }
    }
})


document.querySelector(".btn-hold").addEventListener("click", function () {
    var finalScoreValue = document.querySelector(".final-score").value;
    if (gamePlaying) {
        //Add CURRENT Score to the Global Score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player has won the game 
        if (scores[activePlayer] >= finalScoreValue) {
            document.querySelector("#name-" + activePlayer).textContent = "WINNER";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add('winner');
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove('active');

            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    // if active player is 0 change it to 1 else vice versa.
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector("#current-0").textContent = roundScore;
    document.querySelector("#current-1").textContent = roundScore;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";

}

document.querySelector(".btn-new").addEventListener("click", init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector(".dice").style.display = "none";
    document.querySelector("#score-0").textContent = "0";
    document.querySelector("#score-1").textContent = "0";
    document.querySelector("#current-0").textContent = "0";
    document.querySelector("#current-1").textContent = "0";
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.querySelector(".final-score").value = "";
}