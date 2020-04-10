const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the name of computer science HOD ?",
        choice1: "Mr. Isiaka",
        choice2: "Mr. Olayemi",
        choice3: "Mr. Mai Kudi",
        choice4: "Mr. Oladips",
        answer: 1
    },

    {
        question: "What is the name of room 20's wifi ??",
        choice1: "lutaDaniDera",
        choice2: "localHost",
        choice3: "room-20-wireless",
        choice4: "code",
        answer: 4
    },

    {
        question: "Who likes copy and paste like his life?",
        choice1: "Tobi de Babalawo",
        choice2: "Samuel de Smith",
        choice3: "Daniel de Realice",
        choice4: "Matin de Luta",
        answer: 2
    },

    {
        question: "Tobi de Great will mostly be remembered as?",
        choice1: "Airtel Man",
        choice2: "Network Finder",
        choice3: "Girl's MIS",
        choice4: "Local Man",
        answer: 3
    },

    {
        question: "When we go broke in Chosen Estate, how do we make money?",
        choice1: "Robb POS",
        choice2: "We no be broke boys",
        choice3: "pour our anger for nepa",
        choice4: "Wash tank",
        answer: 4
    },


];

//Constants
const correctBonus = 10;
const maxQuestions = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.lenght === 0 || questionCounter >= maxQuestions){
        return window.location.assign("\scores.html");
    }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
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

startGame();
