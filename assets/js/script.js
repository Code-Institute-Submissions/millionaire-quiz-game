var myArr = [];
var steps = 1;
var correctAnswer;
var totalQuestions = 547;
var randomQuestion;

// Function to load questions from JSON file.
$(function() {
    var xmlhttp = new XMLHttpRequest();
    var url = "questions.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myArr = JSON.parse(this.responseText);
            selectQuestion(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    timerStart();
});

function selectQuestion(arr) {
    randomQuestion = generateNumber();
    $("#question").html(arr[randomQuestion].question);
    $("#answer_a").html(arr[randomQuestion].answer_a);
    $("#answer_b").html(arr[randomQuestion].answer_b);
    $("#answer_c").html(arr[randomQuestion].answer_c);
    $("#answer_d").html(arr[randomQuestion].answer_d);
    correctAnswer = arr[randomQuestion].correct;

};


// Function to check selected answer

function selected(a) {
    if (a === correctAnswer) {
        $("#correct").html("You guess it right");
        steps = steps + 1;
        resetTimer();
    } else {
        gameOver();
    }
}

// Question countdown functions

function timerStart() {
    var timeleft = 45;
    downloadTimer = setInterval(function() {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            $("#countdown").html("Time's out!");
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


// Function to generate random question

function generateNumber() {
    while (0 !== totalQuestions) {
        var currentIndex = Math.floor(Math.random() * totalQuestions);
        totalQuestions -= 1;
        return currentIndex;
    }
}

function gameOver() {
    $("#correct").html("Sorry, wrong answer");
    resetTimer();
}