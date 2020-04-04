var myArr = [];
var steps = 1;
var step = 0;
var selection;
var selectedQuestions = [];
var correctAnswer;
var totalQuestions = 547;
var randomQuestion;
var questionLength;
var timeleft;
var downloadTimer;

// Function to generate unique set of 12 questions using Chance.js library

function generateUnique() {
    var uniques = chance.unique(chance.natural, 12, {
        min: 1,
        max: 547
    });
    return uniques;
}

// Function to load questions from JSON file.
$(function() {
    var xmlhttp = new XMLHttpRequest();
    var url = "questions.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            // selectQuestion(myArr);
            loadQuestions();
            startGame();
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    $(".answer-button").removeClass("selected-answer correct-answer")
});

// Function to create sub array of 12 questions from big array using generated numbers

function loadQuestions() {
    randomQuestion = generateUnique();
    for (i = 0; i < 12; i++) {
        var value = randomQuestion[i];
        selectedQuestions.push(myArr[value]);
        console.log(selectedQuestions[i]);
    }

    return selectedQuestions;

}

function startGame() {
    selection = {
        q: selectedQuestions[step].question,
        a: selectedQuestions[step].answer_a,
        b: selectedQuestions[step].answer_b,
        c: selectedQuestions[step].answer_c,
        d: selectedQuestions[step].answer_d,
        cor: selectedQuestions[step].correct
    };
    $(".answer-button").removeClass("selected-answer correct-answer");
    document.getElementById("question").innerHTML = selection.q;
    document.getElementById("answer_a").innerHTML = selection.a;
    document.getElementById("answer_b").innerHTML = selection.b;
    document.getElementById("answer_c").innerHTML = selection.c;
    document.getElementById("answer_d").innerHTML = selection.d;
    correctAnswer = selection.cor;
    questionLength = selection.q.length;
    delay();
};

//Function to display question and answers



// Function to check selected answer

function selected(a) {
    $("#" + a).addClass("selected-answer");
    if (a == correctAnswer) {
        $("#correct").html("You guess it right");
        step = step + 1;
        resetTimer();
        startGame();
    } else if (timeleft <= 0) {
        timeOut();
    } else {
        wrongAnswer();
    }
}

// Question countdown functions

function timerStart() {
    timeleft = 45;
    downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            timeOut();
        } else {
            $("#countdown").html(timeleft + " seconds remaining");
        }
        timeleft -= 1;
    }, 1000);
}

function resetTimer() {
    clearInterval(downloadTimer);
    $("#countdown").empty();
}

// Function to delay the timer based on the length of the question

function delay() {
    var t = (calculateDelay(questionLength) * 1000);
    console.log("Time: " + t);
    setTimeout(function() {
        timerStart();
    }, t);
}

function calculateDelay(q) {
    var q = questionLength;
    console.log("Delay " + questionLength);
    if (q < 20) {
        console.log("Less than 20");
        return 5;
    } else if (q < 50) {
        console.log("Less than 50");
        return 10;
    } else if (q < 75) {
        console.log("Less than 75");
        return 15;
    } else if (q < 100) {
        console.log("Less than 100");
        return 20;
    }
}

// Wrong answer function
function wrongAnswer() {
    alert("Sorry, wrong answer\nCorrect answer is " + selection.cor);
    $("#" + selection.cor).addClass("correct-answer");
    gameOver();
}


// Game over function

function gameOver() {
    $("#correct").html("GAME OVER");
    resetTimer();
}

// Time Out function

function timeOut() {
    $("#countdown").html("Time's out!");
}