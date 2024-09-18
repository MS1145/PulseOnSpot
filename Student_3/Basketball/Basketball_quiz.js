const questions = [
    {
        //Question 1
        question: "How high is the regulation goal in the game of basketball?",
        optionA: "9 feet",
        optionB: "10 feet",
        optionC: "12 feet",
        optionD: "13 feet",
        correctOption: "optionB"
    },

    {
        //Question 2
        question: "How many total players are on the basketball court at one time during a game?",
        optionA: "8 players",
        optionB: "9 players",
        optionC: "10 players",
        optionD: "11 players",
        correctOption: "optionB"
    },

    {
        //Question 3
        question: "How many points is a free throw worth?",
        optionA: "1 point",
        optionB: "2 points",
        optionC: "3 points",
        optionD: "4 points",
        correctOption: "optionA"
    },

    {
        //Question 4
        question: "What is it called when you make a shot behind the arc in the NBA?",
        optionA: "Clear",
        optionB: "Long-Basket",
        optionC: "Arc-Shot",
        optionD: "Three-pointer",
        correctOption: "optionD"
    },

    {
        //Question 5
        question: "How many quarters are played in a professional basketball game?",
        optionA: "4 quarters",
        optionB: "8 quarters",
        optionC: "6 quarters",
        optionD: "2 quarters",
        correctOption: "optionA"
    },

    {
        //Question 6
        question: "Who has the highest career scoring average?",
        optionA: "Klay Thompson",
        optionB: "Stephen Curry",
        optionC: "Micheal Jordan",
        optionD: "LeBron James",
        correctOption: "optionC"
    },

    {
        //Question 7
        question: "Who has the most career playoff points?",
        optionA: "Klay Thompson",
        optionB: "Stephen Curry",
        optionC: "Micheal Jordan",
        optionD: "LeBron James",
        correctOption: "optionC"
    },

    {
        //Question 8
        question: "Who has won the most MVPs in Basketball?",
        optionA: "Micheal Jordan",
        optionB: "Stephen Curry",
        optionC: "Russell Westbrook",
        optionD: "Kareem Abdul-Jabbar",
        correctOption: "optionD"
    },

    {
        //Question 9
        question: "Which team in NBA has the highest winning percentage?",
        optionA: "San Antonio Spurs",
        optionB: "Golden State Warriors",
        optionC: "Los Angeles Lakers",
        optionD: "Boston Celtics",
        correctOption: "optionA"
    },

    {
        //Question 10
        question: "Who won the NBA playoffs in 2022?",
        optionA: "San Antonio Spurs",
        optionB: "Golden State Warriors",
        optionC: "Los Angeles Lakers",
        optionD: "Boston Celtics",
        correctOption: "optionB"
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
    window.location.href = "../../Student_4/Sports-ThumnailPage/Sports.html";
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
