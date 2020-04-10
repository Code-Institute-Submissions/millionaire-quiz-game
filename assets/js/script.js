/*
 * Global Variables
 */

const prize = [
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
var timeleft;
var downloadTimer;
var player;
var chances = 3;

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/**
 * Function to generate unique set of 12 questions using Chance.js library 
 */

function generateUnique() {
    const uniques = chance.unique(chance.natural, 12, {
        min: 1,
        max: 547,
    });
    return uniques;
}

/*
 * Function to load questions from JSON file. 
 */

$(function() {
    const xmlhttp = new XMLHttpRequest();
    const url = 'questions.json';

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let fullSetQuestions = JSON.parse(this.responseText);
            loadQuestions(fullSetQuestions);
            $('#startGameWindow').modal('hide');
            $('#game-screen').hide();
            $('#gameOverWindow').modal('hide');
            $('#timeOutWindow').modal('hide');
            $('.answer-button').removeClass('wrong-answer correct-answer');
        }

    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();

});

/*
 * Function to create sub array of 12 questions from big array using generated numbers 
 */

function loadQuestions(fullSet) {
    const gameQuestionNumbers = generateUnique();
    selectedQuestions = gameQuestionNumbers.map(numbers => fullSet[numbers]);
    console.log(selectedQuestions);
    return selectedQuestions;
}

/* 
 * Function called when the game starts. Checks if name input box not empty.
 */

$('#startGameButton').click(function() {
    player = document.getElementById('playerName').value;
    if (player.length === 0) {
        $('#missingName').text('You need to enter your name');
    } else {
        $('#startGameWindow').modal('hide');
        $('#welcome-screen').hide();
        $('#game-screen').show();
        document.getElementById('player').innerHTML = player;
        startGame();
    }
});

/*
 * Function to pick question for each round and display question and answers on screen
 */

function startGame() {
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
    $('.selection-button').prop("disabled", true);
    $('.selection-button').removeClass('answer-button');
    $('#prize').text(prize[step]);
    showAllButtons();
    $('#chances').text('50:50 Chance x ' + chances);
    delay();
}

/*
 * Function to check selected answer
 */

$('.selection-button').click(
    function() {
        const clickedButton = this.value;
        if (step === 11) {
            victory();
        } else {
            $('#' + clickedButton).addClass('correct-answer');
            if (clickedButton == selection.cor) {
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
);


/* 
 *  Question countdown timer function
 */

function timerStart() {
    timeleft = 45;
    downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            timeOut();
        } else {
            /** 
             * Enabling buttons click event after the delay
             */
            $('.selection-button').prop("disabled", false);
            $('.selection-button').addClass('answer-button');
            $('#countdown').html(`<i class="fas fa-hourglass-half"></i> ${timeleft}`);
        }
        timeleft -= 1;
    }, 1000);
}

/*
 * Function used to reset the timer after successful answer or failed game. 
 * Used to prevent multiple timers running at the same time
 */


function resetTimer() {
    clearInterval(downloadTimer);
    $('#countdown').empty();
}

/*
 * Function to delay the timer based on the length of the question
 */

function delay() {
    const t = calculateDelay(selection.q.length) * 1000;
    setTimeout(function() {
        timerStart();
    }, t);
}

/* 
 * Function that returns the amount of seconds of delay based on the length of the question in characters. 
 * Used to hold the timer and allow the player to read the question.
 */

function calculateDelay(qLength) {
    if (qLength < 21) {
        return 2;
    } else if (qLength < 51) {
        return 4;
    } else if (qLength < 100) {
        return 6;
    } else if (qLength < 200) {
        return 8;
    }
}

/* 
 * Function to display Winner pop up when all question answered correctly
 */

function victory() {
    $('#victoryWindow').modal('show');
}

/*
 * Wrong answer function
 */

function wrongAnswer() {
    $('#' + selection.cor).addClass('correct-answer');
    gameOver();
}

/*
 * Game over function, used when player clicks on wrong answer
 */

function gameOver() {
    if (step === 0) {
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

/* 
 * Function called when game fails either by out of time event or by selecting the wrong question
 */

$('.playAgainButton').click(function() {
    resetTimer();
    setInterval(function() {
        location.reload();
    }, 700);
});

/*
 * Time Out function, used when player doesn't click on any answer
 */

function timeOut() {
    $('#countdown').html('<i class="fas fa-hourglass-half"></i> 0');
    $('#timeOutWindow').modal('show');
}

/* 
 * Save scores function, only saving results with more than 3 questions answered correctly
 */

function saveScores() {
    if (step >= 3) {
        let score = {
            step: step,
            score: prize[step],
            player: player,
        };
        highScores.push(score);
        highScores.sort((a, b) => b.step - a.step);
        highScores.splice(10);

        localStorage.setItem('highScores', JSON.stringify(highScores));
    }
}

/* 
 * Function to reset all buttons after successful answer
 */

function showAllButtons() {
    $('.answers-buttons-rows').removeClass('hide');
    if (chances !== 0) {
        $('#chancesButton').removeClass('disabled');
    } else {
        $('#chancesButton').text('All chances used').addClass('disabled').prop("disabled", true);
    }
}


/* 
 * Function to hide 2 incorrect answers when Chance button is clicked
 */

$('#chancesButton').click(function() {
    chances = chances - 1;
    if (selection.cor === 'answer_a' || selection.cor == 'answer_b') {
        $('.second-answers-row').addClass('hide');
        if (chances !== 0) {
            $('#chancesButton').text('50:50 Chance x ' + chances).addClass('disabled');
        } else {
            $('#chancesButton').text('All chances used').addClass('disabled');
        }
    } else {
        $('.first-answers-row').addClass('hide');
        if (chances !== 0) {
            $('#chancesButton').text('50:50 Chance x ' + chances).addClass('disabled');
        } else {
            $('#chancesButton').text('All chances used').addClass('disabled');
        }
    }
});

/*
 * Function to quit the game at go back to welcome screen
 */

$('#quitGameButton').click(function() {
    location.reload();
});