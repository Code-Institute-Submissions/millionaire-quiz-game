var prize = [
    '€500',
    '€1,000',
    '€2,000',
    '€5,000',
    '€10,000',
    '€20,000',
    '€40,000',
    '€75,000',
    '€125,000',
    '€250,000',
    '€500,000',
    '€1,000,000',
];
var step = 0;
var selection;
var selectedQuestions = [];
var correctAnswer;
var questionLength;
var timeleft;
var downloadTimer;
var player;
var chances = 3;

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Function to generate unique set of 12 questions using Chance.js library

function generateUnique() {
    var uniques = chance.unique(chance.natural, 12, {
        min: 1,
        max: 547,
    });
    return uniques;
}

// Function to load questions from JSON file.
$(function() {
    var xmlhttp = new XMLHttpRequest();
    var url = 'questions.json';

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var fullSetQuestions = [];
            fullSetQuestions = JSON.parse(this.responseText);
            loadQuestions(fullSetQuestions);
            $('#myModal').modal('hide');
            $('#game-screen').hide();
            $('#gameOverWindow').modal('hide');
            $('#timeOutWindow').modal('hide');
            $('.answer-button').removeClass('wrong-answer correct-answer');
        }

    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();

});

// Function to create sub array of 12 questions from big array using generated numbers

function loadQuestions(fullSet) {
    var gameQuestionNumbers = generateUnique();
    selectedQuestions = gameQuestionNumbers.map(numbers => fullSet[numbers]);
    console.log(selectedQuestions);
    return selectedQuestions;
}

// Function called when the game starts. Checks if name input box not empty.
function firstPlay() {
    player = document.getElementById('playerName').value;
    if (player.length == 0) {
        $('#missingName').text('You need to enter your name');
    } else {
        $('#myModal').modal('hide');
        $('#welcome-screen').hide();
        $('#game-screen').show();
        document.getElementById('player').innerHTML = player;
        startGame();
    }
}

function startGame() {;
    $('#correctMessage').empty();
    $('#correct').empty();
    selection = {
        q: selectedQuestions[step].question,
        a: selectedQuestions[step].answer_a,
        b: selectedQuestions[step].answer_b,
        c: selectedQuestions[step].answer_c,
        d: selectedQuestions[step].answer_d,
        cor: selectedQuestions[step].correct
    };
    $('.answer-button').removeClass('wrong-answer correct-answer');
    $('#questionNumber').text(step + 1);
    $('#question').text(selection.q);
    $('#answer_a').text(selection.a);
    $('#answer_b').text(selection.b);
    $('#answer_c').text(selection.c);
    $('#answer_d').text(selection.d);
    $('#answer_a').prop("disabled", true);
    $('#answer_b').prop("disabled", true);
    $('#answer_c').prop("disabled", true);
    $('#answer_d').prop("disabled", true);
    $('#answer_a').removeClass('answer-button');
    $('#answer_b').removeClass('answer-button');
    $('#answer_c').removeClass('answer-button');
    $('#answer_d').removeClass('answer-button');
    $('#prize').text('Current prize: ' + prize[step]);
    correctAnswer = selection.cor;
    questionLength = selection.q.length;
    showAllButtons();
    $('#chances').text('50:50 Chance x ' + chances);
    delay();
}

// Function to check selected answer

function selected(clickedButton) {
    // First check if this is the final question of the game
    if (step === 11) {
        victory();
    } else {
        $('#' + clickedButton).addClass('correct-answer');
        if (clickedButton == correctAnswer) {
            $('#correctMessage').text('Correct !');
            step = step + 1;
            resetTimer();
            setTimeout(function() {
                startGame();
            }, 3000);

        } else if (timeleft <= 0) {
            timeOut();
        } else {
            $('#' + clickedButton).removeClass('correct-answer');
            $('#' + clickedButton).addClass('wrong-answer');
            wrongAnswer();
        }
    }
}

// Question countdown timer function

function timerStart() {
    timeleft = 45;
    downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            timeOut();
        } else {
            // Enabling buttons click event after the delay
            $('#answer_a').prop("disabled", false);
            $('#answer_b').prop("disabled", false);
            $('#answer_c').prop("disabled", false);
            $('#answer_d').prop("disabled", false);
            $('#answer_a').addClass('answer-button');
            $('#answer_b').addClass('answer-button');
            $('#answer_c').addClass('answer-button');
            $('#answer_d').addClass('answer-button');
            $('#countdown').html(`<i class="fas fa-hourglass-half"></i> ${timeleft}`);
        }
        timeleft -= 1;
    }, 1000);
}

//Function used to reset the timer after sucessful answer or failed game. Used to prevent multiple timers running at the same time

function resetTimer() {
    clearInterval(downloadTimer);
    $('#countdown').empty();
}

// Function to delay the timer based on the length of the question

function delay() {
    var t = calculateDelay(questionLength) * 1000;
    console.log('Time: ' + t);
    setTimeout(function() {
        timerStart();
    }, t);
}

// Function that returns the amount of seconds of delay based on the lenght of the question in characters. Used to hold the timer and allow the player to read the question

function calculateDelay(q) {
    var q = questionLength;
    if (q < 21) {
        return 2;
    } else if (q < 51) {
        return 4;
    } else if (q < 76) {
        return 6;
    } else if (q < 200) {
        return 6;
    }
}

// Function to display Winner pop up when all question answered correctly
function victory() {
    $('#victoryWindow').modal('show');
}

// Wrong answer function
function wrongAnswer() {
    $('#' + selection.cor).addClass('correct-answer');
    gameOver();
}

// Game over function, used when player clicks on wrong answer

function gameOver() {
    if (step == 0) {
        resetTimer();
        $('#countdown').hide();
        $('#step').text(`You've failed to answer the first question`);
        $('#prizeWon').text(`You didn't win any money :-(`);
        $('#gameOverWindow').modal('show');
    } else {
        resetTimer();
        saveScores();
        $('#countdown').hide();
        $('#step').text(`You've reached question ${step}`);
        $('#prizeWon').text(`Your prize is ${prize[step-1]}`);
        $('#gameOverWindow').modal('show');
    }
}

// Function used when game fails either by out of time event or by selecting the wrong question

function playAgain() {
    resetTimer();
    setInterval(function() {
        location.reload();
    }, 700);
}

// Time Out function, used when player doesn't click on any answer

function timeOut() {
    $('#countdown').html('<i class="fas fa-hourglass-half"></i> 0');
    $('#timeOutWindow').modal('show');
}

// Save scores function, only saving results with more than 3 questions answered correctly

function saveScores() {
    if (step >= 3) {
        var score = {
            step: step,
            score: prize[step],
            player: player,
        };
        highScores.push(score);
        highScores.sort((a, b) => b.step - a.step);
        highScores.splice(10);

        localStorage.setItem('highScores', JSON.stringify(highScores));
    };
}

// Function to reset all buttons after successful answer

function showAllButtons() {
    $('#answer_a').show();
    $('#answer_b').show();
    $('#answer_c').show();
    $('#answer_d').show();
    console.log(`Chances: ${chances}`);
    if (chances !== 0) {
        $('#chances').removeClass('disabled');
    } else {
        $('#chances').text('All chances used');
        $('#chances').addClass('disabled');
    }
}


// Function to hide 2 incorrect answers

function useChances() {
    if (correctAnswer == "answer_a" || correctAnswer == 'answer_b') {
        chances = chances - 1;
        $('#answer_c').hide();
        $('#answer_d').hide();
        if (chances !== 0) {
            $('#chances').text('50:50 Chance x ' + chances);
            $('#chances').addClass('disabled');
        } else {
            $('#chances').text('All chances used');
            $('#chances').addClass('disabled');
        }

    } else {
        chances = chances - 1;
        $('#answer_a').hide();
        $('#answer_b').hide();
        if (chances !== 0) {
            $('#chances').text('50:50 Chance x ' + chances);
            $('#chances').addClass('disabled');
        } else {
            $('#chances').text('All chances used');
            $('#chances').addClass('disabled');
        }
    }

}

// Function to quit the game at go back to welcome screen

function quitGame() {
    location.reload();
}