const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is the capital of Brazil?",
        choice1: "Brasilia",
        choice2: "Rio de Janeiro",
        choice3: "Fortaleza",
        choice4: "São Paulo",
        answer: 1,
    },
    {
        question: "Who discovered Brazil?",
        choice1: "Cristoforo Colombo",
        choice2: "Pedro Álvares Cabral",
        choice3: "Amerigo Vespucci",
        choice4: "Gustavo Lima",
        answer: 2,
    },
    {
        question: "How many times has the Brazilian national soccer team won the World Cup?",
        choice1: "7",
        choice2: "0",
        choice3: "3",
        choice4: "5",
        answer: 4,
    },
    {
        question: "What is capoeira?",
        choice1: "A genre of popular music, born in the northeastern part of Brazil",
        choice2: "A typical food that is prepared from rice, meat and black-eyed peas",
        choice3: "A martial art, characterized by music and dance movements",
        choice4: "A protected species of parrot, widesprad in the Amazon rainforest",
        answer: 3,
    }
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 4

startGame = ()=> {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = ()=> {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })
    
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct"){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=> {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()