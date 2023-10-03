const questions = [
    {
        question: "Who is the bumbling regional manager at Dunder Mifflin's Scranton branch?",
        answers: [
            { text: "Michael Scott", correct: true },
            { text: "Dwight Schrute", correct: false },
            { text: "Jim Halpert", correct: false },
            { text: "Pam Beesly", correct: false }
        ]
    },
    {
        question: "What is the name of the paper company where the employees of 'The Office' work?",
        answers: [
            { text: "Wernham Hogg", correct: false },
            { text: "Dunder Mifflin", correct: true },
            { text: "Scranton Paper Co.", correct: false },
            { text: "Paper Central", correct: false }
        ]
    },
    {
        question: "Who initially works as the receptionist at Dunder Mifflin's Scranton branch before Erin Hannon takes over?",
        answers: [
            { text: "Kelly Kapoor", correct: false },
            { text: "Phyllis Smith", correct: false },
            { text: "Angela Martin", correct: false },
            { text: "Pam Beesly", correct: true }
        ]
    },
    {
        question: "Who is known for having a beet farm and being a volunteer sheriff's deputy?",
        answers: [
            { text: "Andy Bernard", correct: false },
            { text: "Kevin Malone", correct: false },
            { text: "Oscar Martinez", correct: false },
            { text: "Dwight Schrute", correct: true }
        ]
    },
    {
        question: "Which character is notorious for his prankster personality and love for Jim's pranks?",
        answers: [
            { text: "Oscar Martinez", correct: false },
            { text: "Toby Flenderson", correct: false },
            { text: "Ryan Howard", correct: false },
            { text: "Dwight Schrute", correct: true }
        ]
    },
    {
        question: "What is the name of Jim and Pam's daughter?",
        answers: [
            { text: "Lily", correct: false },
            { text: "Cece", correct: true },
            { text: "Ellie", correct: false },
            { text: "Sophie", correct: false }
        ]
    },
    {
        question: "Who is known for his obsession with his 'World's Best Boss' coffee mug?",
        answers: [
            { text: "Stanley Hudson", correct: false },
            { text: "Angela Martin", correct: false },
            { text: "Phyllis Smith", correct: false },
            { text: "Michael Scott", correct: true }
        ]
    },
    {
        question: "What is the name of the company that acquires Dunder Mifflin in the later seasons of the series?",
        answers: [
            { text: "Sabre", correct: true },
            { text: "Paper World Inc.", correct: false },
            { text: "Office Essentials", correct: false },
            { text: "Papyrus", correct: false }
        ]
    },
    {
        question: "Which character is a former member of the rock band 'The Grass Roots'?",
        answers: [
            { text: "Andy Bernard", correct: false },
            { text: "Kevin Malone", correct: false },
            { text: "Creed Bratton", correct: true },
            { text: "Oscar Martinez", correct: false }
        ]
    },
    {
        question: "Which character is known for his alter ego 'Prison Mike' during a workplace safety meeting?",
        answers: [
            { text: "Jim Halpert", correct: false },
            { text: "Kevin Malone", correct: false },
            { text: "Michael Scott", correct: true },
            { text: "Stanley Hudson", correct: false }
        ]
    }
];
document.addEventListener('DOMContentLoaded', function () {
    // Show the loader
    let loader = document.querySelector('.loader');
    loader.style.display = 'block';

    // Set a minimum display time for the loader (e.g., 2 seconds)
    let minDisplayTime = 2000; // 2 seconds

    // Hide the loader after the minimum display time
    setTimeout(function () {
        loader.style.display = 'none';
        contestantContainer.style.display = 'block'
    }, minDisplayTime);
});



const contestantContainer = document.querySelector('.contestantContainer');
const qnaContainer = document.querySelector('.qnaContainer');

const contestant_name = document.getElementById('name');
const quizMe = document.getElementById('ready');

let currScore = document.getElementById('currentScore');
let currQuesIndex = 0;
let score = 0;


quizMe.addEventListener('click', (e) => {
    e.preventDefault();

    let name = contestant_name.value;
    let playerName = document.getElementById('playerName');

    playerName.innerHTML = name;
    currScore.innerHTML = score;

    if (name.trim() !== '') {
        // name = '';
        startQuiz();
    }
    else {
        alert('Write your name to enter the quiz!');
        console.log('btn clicked');
    }
});

function startQuiz() {
    contestantContainer.classList.toggle('contestantContainerChange');
    qnaContainer.classList.toggle('qnaContainerChange');

    currQuesIndex = 0;
    showQuestion();

}

const questionElement = document.getElementById('question');
const options = document.getElementById('option');
const nextButton = document.getElementById('nextBtn');
const totalQuestions = questions.length;

function showQuestion() {
    let currQuestion = questions[currQuesIndex];
    let questionNo = currQuesIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currQuestion.question;

    currQuestion.answers.forEach(answers => {
        const button = document.createElement('button');
        button.innerHTML = answers.text;
        button.classList.add('btn');
        options.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener('click', selectAnswer)
    })
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
        currScore.innerHTML = score;
    }
    else {
        selectedButton.classList.add('incorrect');
    }
    Array.from(options.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = 'true';
    })

    nextButton.style.display = 'inline-block';

    if (currQuesIndex === totalQuestions - 1) {
        nextButton.innerHTML = 'Finish';
    }
}

const nextBtn = document.getElementById('nextBtn');

nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    while (options.firstChild) {
        options.removeChild(options.firstChild);
    }
    currQuesIndex++;

    let questionContainer = document.querySelector('.question');
    let scoreAndNextContainer = document.querySelector('.scoreAndNext');
    let finishContainer = document.querySelector('.finish');
    let result = document.querySelector('.result');
    let resultImg = document.getElementById('result');

    if (currQuesIndex === totalQuestions) {
        if (score < 5) {
            questionContainer.style.display = 'none';
            scoreAndNextContainer.style.display = 'none';
            finishContainer.style.display = 'flex';
            result.textContent = `Your score is ${score}. Stanley is disappointed in you.😄`;
            resultImg.src = 'Images/stanley-the-office.gif';
        }
        else if (score >= 5 && score <= 7) {
            questionContainer.style.display = 'none';
            scoreAndNextContainer.style.display = 'none';
            finishContainer.style.display = 'flex';
            result.textContent = `Your score is ${score}. Angela says your performance was not unpleasing.😄`;
            resultImg.src = 'Images/Angela.jpg';
        }
        else if (score > 7 && score < 10) {
            questionContainer.style.display = 'none';
            scoreAndNextContainer.style.display = 'none';
            finishContainer.style.display = 'flex';
            result.textContent = `Your score is ${score}. Your reward is Kevin's Famous Chilli.😄`;
            resultImg.src = 'Images/kevin-famous-chilli.webp';
        }
        else if (score === 10) {
            questionContainer.style.display = 'none';
            scoreAndNextContainer.style.display = 'none';
            finishContainer.style.display = 'flex';
            result.textContent = `Your score is ${score}. Your reward is being Assistant to the Regional Manager😄`;
            resultImg.src = 'Images/dwight-result.jpg';
        }
    } else {
        nextButton.style.display = 'none';
        showQuestion();
    }
})

function refreshPage() {
    location.reload();
}




