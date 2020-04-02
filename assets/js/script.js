var myArr = [];
var steps = 1;
var correctAnswer;

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
    $("#question").html(arr[0].question);
    $("#answer_a").html(arr[0].answer_a);
    $("#answer_b").html(arr[0].answer_b);
    $("#answer_c").html(arr[0].answer_c);
    $("#answer_d").html(arr[0].answer_d);
    correctAnswer = arr[0].correct;

};


// Function to check selected answer

function selected(a) {
    if (a === correctAnswer) {
        $("#correct").html("You guess it right");
        steps = steps + 1;

    } else {
        $("#correct").html("Sorry, wrong answer");
    }
}