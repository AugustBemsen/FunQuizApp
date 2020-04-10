const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game')
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
fetch("../questions.json")
.then(res => {
    return res.json();
})
.then(loadedQuestions => {
    questions = loadedQuestions
    startGame();
        
}).catch(err => {
    console.log(err);
    
});

//Constants
const correctBonus = 10;
const maxQuestions = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    setTimeout( () => {
        getNewQuestion();
        game.classList.remove('hidden');
        loader.classList.add('hidden');
    }, 3000);
    
};

getNewQuestion = () => {
    if (availableQuestions.lenght === 0 || questionCounter >= maxQuestions){
        localStorage.setItem("recentScore", score);
        return window.location.assign("../pages/scores.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];

    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers)
            
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswers = selectedChoice.dataset["number"];

            const classToApply = selectedAnswers == currentQuestion.answer ? "correct" : "incorrect";

            if (classToApply === "correct") {
                incrementScore(correctBonus);
            }

            selectedChoice.parentElement.classList.add(classToApply);
            setTimeout ( () => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1010);

    
    });

    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    }

});