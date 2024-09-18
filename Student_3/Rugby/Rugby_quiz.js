const questions = [
    {
        //Question 1
        question: "How many players are on the field from each team in Rugby?",
        optionA: "6 players",
        optionB: "11 players",
        optionC: "13 Players",
        optionD: "15 players",
        correctOption: "optionD"
    },

    {
        //Question 2
        question: "How long does a rugby match last?",
        optionA: "2 times by 30 mins",
        optionB: "1 time by 60 mins",
        optionC: "2 times by 40 mins",
        optionD: "3 times by 20 mins",
        correctOption: "optionC"
    },

    {
        //Question 3
        question: "What is the field size for rugby?",
        optionA: "120m x 50m",
        optionB: "100m x 100m",
        optionC: "90m x 130m",
        optionD: "100m x 70m",
        correctOption: "optionD"
    },

    {
        //Question 4
        question: "How many points does the team get for a try?",
        optionA: "2 points",
        optionB: "3 points",
        optionC: "5 points",
        optionD: "6 points",
        correctOption: "optionC"
    },

    {
        //Question 5
        question: "Where will the 2023 Rugby World Cup be held?",
        optionA: "France",
        optionB: "USA",
        optionC: "Canada",
        optionD: "Italy",
        correctOption: "optionA"
    },

    {
        //Question 6
        question: "Which player has scored the most points in a single World Cup campaign?",
        optionA: "Jonny Wilkinson",
        optionB: "Dan Carter",
        optionC: "Percy Montgomery",
        optionD: "Grant Fox",
        correctOption: "optionD"
    },

    {
        //Question 7
        question: "Who has made the most appearances as captain in RWC history?",
        optionA: "Schalk Burger",
        optionB: "Richie McCaw",
        optionC: "Jason Leonard",
        optionD: "Will Carling",
        correctOption: "optionB"
    },

    {
        //Question 8
        question: "Who is the youngest try scorer in World Cup history?",
        optionA: "Vasil Lobzhanidze",
        optionB: "George North",
        optionC: "Joe Roff",
        optionD: "Brian Lima",
        correctOption: "optionB"
    },

    {
        //Question 9
        question: "Which team has the most titles in Premiership Rugby?",
        optionA: "Leicester Tigers",
        optionB: "Exeter Chiefs",
        optionC: "Harlequins",
        optionD: "Wasps",
        correctOption: "optionA"
    },

    {
        //Question 10
        question: "What is the oldest rugby club in Premiership Rugby?",
        optionA: "Wasps",
        optionB: "Bath",
        optionC: "Saracens",
        optionD: "Sale Sharks",
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












