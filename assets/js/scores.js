var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];;

highScoresList.innerHTML = highScores
    .map(score => {
        return `<li>${score.player} - ${score.score}</li>`;
    })
    .join("");