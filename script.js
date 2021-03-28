var questions = [
    {
      numb: 1,
      question: "Which of the following is not an array method?",
      answer: "toLowercase",
      options: ["toLowercase", "forEach", "map", "for loop"],
    },
    {
      numb: 2,
      question: 'How do you call a function named "myFunction"',
      answer: "myFunction()",
      options: [
        "myFunction{}",
        "call function myFunction()",
        "call myFunction()",
        "myFunction()",
      ],
    },
    {
      numb: 3,
      question: 'How do you write "Hello World" in an alert box?',
      answer: 'alert("Hello World")',
      options: [
        'alert("Hello World")',
        'msg("Hello World")',
        'alertBox("Hello World")',
        "All of the above",
      ],
    },
    {
      numb: 4,
      question:
        "Which of the following is not a data type supported by Javascript?",
      answer: "echo",
      options: ["Undefined", "Null", "Boolean", "echo"],
    },
    {
      numb: 5,
      question: "How do you create a function in JavaScript?",
      answer: "function = myFunction()",
      options: [
        "function myFunction()",
        "function = myFunction()",
        "function:myFunction()",
        "function == myFunction()",
      ],
    },
];

//select all html elements needed
var start_btn = document.querySelector(".start_btn button");
var info_box = document.querySelector(".info_box");
var quiz_box = document.querySelector(".quiz-container");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
var time_line = document.querySelector("header .time_line");
var timeText = document.querySelector(".timer .time_left_txt");
var timeCount = document.querySelector(".timer .timer_sec");
var selectedResultBox = document.querySelector(".selected-result");
var question_text = document.querySelector(".que_text");
var startPageBox = document.querySelector(".start_btn")


var timeValue = 15;
var que_count = 0;
var que_numb = 1;
var userScore = 0;
var counter;
var timer = 60

//add event listener on start quiz button to start quiz
start_btn.addEventListener("click", function() {
    startTimer(timer) // call on the setTimer function
    startPageBox.classList.add("hide")
    quiz_box.classList.add("activeQuiz"); //show quiz container
    showQuestions(0)
})

//function to start quiz
function showQuestions(index) {
    // var question = questions[index].question
    // var question_number = questions[index].numb
    var question_tag =
      "<span>" +
      questions[index].numb +
      ". " +
      questions[index].question +
      "</span>";
    // var question_tag =`<span> ${question_number} </span> <span> ${question} </span>`
    var option_tag = '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>"
    question_text.innerHTML = question_tag //display questions
    option_list.innerHTML = option_tag
    var option = document.querySelectorAll(".option")
    
    option.forEach(function(item) {
        item.addEventListener("click", function() {
            selectedOption(this)
        })
    })
}

function showNextQuestion() {
    if(que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count)
    } else {
        clearInterval(counter) //clear counter
        showResult()
    }
}

function selectedOption(answer) {
    var userAnswer = answer.textContent //get user answer from textContent
    var correctAnswer = questions[que_count].answer
    
    //compare userAnswer with correctAnswer
    if(userAnswer == correctAnswer){
        userScore += 1; // increment userscore
        selectedResultBox.innerHTML = "<p> correct </p>";
            setTimeout(function () {
            selectedResultBox.innerHTML = ""; //clear selected option result after 1.5 seconds
          }, 1500);
    } else {
        selectedResultBox.innerHTML = "<p> wrong </p>";
        setTimeout(function () {
            selectedResultBox.innerHTML = ""; //clear selected option result after 1.5 seconds
          }, 1500);
        var newTimer = timer - 15
        clearInterval(counter)
        startTimer(newTimer)
    }
    showNextQuestion(); //show next question when user clicks on an option
}

//function to start timer when start button is clicked
function startTimer(time) {
   counter = setInterval(timer, 1000)
   function timer() {
       timeCount.textContent = time //changing the value of timeCount with time value
       timer = time;
       time-- //decrease time by 1;
       if(time < 0) {
           clearInterval(counter)
           showResult()
       }
   }
}

function showResult() {
    console.log("Game Over")

    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    startPageBox.classList.add("hide"); //hide start button
    var scoreText = result_box.querySelector(".score_text");
    // display user's result
    var scoreTag =
      "<span> Your score is <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
}