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

let questions = [
    {
        question : "Who beat up three people ?",
        choice1 : "Derrah",
        choice2 : "Matins",
        choice3 : "Aaron",
        choice4 : "Sammlo",
        answer : 3
    },
   {
        question : "What is the name of room 20's wifi ??",
        choice1 : "lutaDaniDera",
        choice2 : "localHost",
        choice3 : "room-20-wireless",
        choice4 : "code",
        answer : 4
    },
    {
        question : "Who likes copy and paste like his life?",
        choice1 : "Tobi de Babalawo",
        choice2 : "Samuel de Smith",
        choice3 : "Daniel de Realice",
        choice4 : "Matin de Luta",
        answer : 2
    },
    {
        question : "Tobi de Great will mostly be remembered as?",
        choice1 : "Airtel Man",
        choice2 : "Network Finder",
        choice3 : "Girl's MIS",
        choice4 : "Local Man",
        answer : 3
    },
    {
        question : "When we go broke in Chosen Estate, how do we make money?",
        choice1 : "Robb POS",
        choice2 : "We no be broke boys",
        choice3 : "pour our anger for nepa",
        choice4 : "Wash tank",
        answer : 4
    },
    {
        question : "Who is the best tutor for long lasting sex advice?",
        choice1 : "Dr. Tobi de MIS",
        choice2 : "Luta de Stiker",
        choice3 : "Sammlo de Bolanle Lord",
        choice4 : "Dani de Reptor Man",
        answer : 3
    },
    {
        question : "Treker of all time?",
        choice1 : " e no pass Luta",
        choice2 : "thobie sneh",
        choice3 : "Sammlo de Bolanle Lord",
        choice4 : "Dani de Reptor Man",
        answer : 1
    },
    {
        question : "Who the cry like pikin for sign out water mending?",
        choice1 : "Derrah",
        choice2 : "Abigail",
        choice3 : "Aaron",
        choice4 : "KayCee",
        answer : 4
    },
    {
        question : "Who like fight pass?",
        choice1 : "David de Mouth Power",
        choice2 : "Matins (Noise Maker)",
        choice3 : "Derrah",
        choice4 : "Aaron de Stone Code",
        answer : 1
    },
    {
        question : "Who enjoy BJ Pass?",
        choice1 : "Sammloo",
        choice2 : "Thobie Sneh",
        choice3 : "Luta de Great",
        choice4 : "Dani De Ghud",
        answer : 1
    }
];

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
startGame();