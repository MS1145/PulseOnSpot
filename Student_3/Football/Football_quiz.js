const questions = [
    {
        //Question 1
        question: "How many players does each team have on the pitch when a football match starts?",
        optionA: "10 players",
        optionB: "11 players",
        optionC: "12 Players",
        optionD: "13 players",
        correctOption: "optionB"
    },

    {
        //Question 2
        question: "How long is an official professionally sanctioned game?",
        optionA: "45 mins",
        optionB: "60 mins",
        optionC: "90 mins",
        optionD: "120 mins",
        correctOption: "optionC"
    },

    {
        //Question 3
        question: "If the defending team kicks the ball out on their own goal line, what kind of kick brings the ball back in?",
        optionA: "Corner Kick",
        optionB: "Free Kick",
        optionC: "Penalty",
        optionD: "Kick off",
        correctOption: "optionA"
    },

    {
        //Question 4
        question: "Who has the most goals in football history?",
        optionA: "Zlatan Ibrahimović",
        optionB: "Lionel Messi",
        optionC: "Josef Bican",
        optionD: "Cristiano Ronaldo",
        correctOption: "optionD"
    },

    {
        //Question 5
        question: "Who has won the most ballon d'ors?",
        optionA: "Zlatan Ibrahimović",
        optionB: "Lionel Messi",
        optionC: "Josef Bican",
        optionD: "Cristiano Ronaldo",
        correctOption: "optionB"
    },

    {
        //Question 6
        question: "Which country has won the most world cups?",
        optionA: "Brazil",
        optionB: "Portugal",
        optionC: "Argentina",
        optionD: "USA",
        correctOption: "optionA"
    },

    {
        //Question 7
        question: "Who was the oldest to score a hat-trick at a FIFA World Cup?",
        optionA: "Zlatan Ibrahimović",
        optionB: "Lionel Messi",
        optionC: "Josef Bican",
        optionD: "Cristiano Ronaldo",
        correctOption: "optionD"
    },

    {
        //Question 8
        question: "Which football club has the most trophies?",
        optionA: "Chelsea",
        optionB: "FC Barcelona",
        optionC: "Real Madrid",
        optionD: "Manchester United",
        correctOption: "optionC"
    },

    {
        //Question 9
        question: "Which goalkeeper has the most penalty saves of all time?",
        optionA: "Samir Handanovic",
        optionB: "Courtois",
        optionC: "Emi Martinez",
        optionD: "Andrea Consigli",
        correctOption: "optionA"
    },

    {
        //Question 10
        question: "Who has the most appearances in football history?",
        optionA: "Paul Bastock",
        optionB: "Cristiano Ronaldo",
        optionC: "Lionel Messi",
        optionD: "Peter Shelton",
        correctOption: "optionD"
    },

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

let secondsLeft = 100;

const timer = setInterval(function() {
  secondsLeft--;
  document.getElementById("time-display").textContent = secondsLeft;
  document.getElementById("time-header").textContent = secondsLeft;
  if (secondsLeft === 0) {
    clearInterval(timer);
    alert("Time's up!");
    window.location.href = "../Quiz.html";
  }
}, 1000);


// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "#3ee739"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "#ff5858"
            document.getElementById(correctOption).style.backgroundColor = "#3ee739"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    clearInterval(timer);
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('time-display').innerHTML = 100 - secondsLeft;
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}


var userName = document.getElementById('userName');     
userName.innerText = "NickName : " + localStorage.getItem('name');