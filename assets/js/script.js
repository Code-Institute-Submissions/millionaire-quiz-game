var myArr = [];
var steps = 1;
var selection;
var correctAnswer;
var totalQuestions = 547;
var randomQuestion;
var questionLength;


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

});

function selectQuestion(arr) {
    randomQuestion = generateNumber();
    selection = {
        q: arr[randomQuestion].question,
        a: arr[randomQuestion].answer_a,
        b: arr[randomQuestion].answer_b,
        d: arr[randomQuestion].answer_d,
        c: arr[randomQuestion].answer_c,
        cor: arr[randomQuestion].correct
    };
    display();
};

//Function to display question and answers

function display() {
    document.getElementById("question").innerHTML = selection.q;
    document.getElementById("answer_a").innerHTML = selection.a;
    document.getElementById("answer_b").innerHTML = selection.b;
    document.getElementById("answer_c").innerHTML = selection.c;
    document.getElementById("answer_d").innerHTML = selection.d;
    questionLength = selection.q.length;
    delay();
}

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



// Function to generate random question

function generateNumber() {
    while (0 !== totalQuestions) {
        var currentIndex = Math.floor(Math.random() * totalQuestions);
        totalQuestions -= 1;
        return currentIndex;
    }
}

// Game over function

function gameOver() {
    $("#correct").html("Sorry, wrong answer");
    resetTimer();
}

// Time Out function

function timeOut() {
    $("#countdown").html("Time's out!");
}