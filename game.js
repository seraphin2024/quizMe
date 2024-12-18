const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What is my Nickname??",
    choice1: "Hinata Boke",
    choice2: "Guddi ",
    choice3: "jamuni",
    choice4: "seraphin",
    answer: 2
  },
  {
    question:
      "what kind of person am i ?",
    choice1: "letter/email",
    choice2: "phone-call",
    choice3: "video-call",
    choice4: "text",
    answer: 4
  },
  {
    question: " whats my desired style ? ",
    choice1: "Maximalism",
    choice2: "justin bieber",
    choice3: " Shabby Chic",
    choice4: " Minimalism",
    answer: 4
  },
  {
    question: " whats my fav genre in movies ? ",
    choice1: "Fantasy",
    choice2: "horror/thriller",
    choice3: " SCI-FI",
    choice4: " Romance",
    answer: 2
  },
  {
    question: " what do i prefer most ? ",
    choice1: " anime-series",
    choice2: " anime-movie ",
    choice3: " k-dramas ",
    choice4: " indian serials ",
    answer: 3
  },
  {
    question: " Fav color palette in general  ",
    choice1: "pastel",
    choice2: "neon",
    choice3: " monochromatic",
    choice4: " retro/80s",
    answer: 1
  },
  {
    question: " whats my biggest ick  ",
    choice1: "wrong pronunciation ",
    choice2: "wrong spelling",
    choice3: "wrong grammar overall",
    choice4: " continuous yapping ",
    answer: 2
  },
  {
    question: " whats my fav TV show or movie  ",
    choice1: "Evil Dead rise 2 ",
    choice2: "Hum Saath Saath h / RAAZ REBOOT ",
    choice3: " Haikyuu / attack on titan ",
    choice4: " yeh rishta kya kehlata h / iss pyaar ko kya naam du :)   ",
    answer: 3
  },
  {
    question: " what am i not a big of ? ",
    choice1: " webtoon",
    choice2: " Manga ",
    choice3: " Books",
    choice4: " Menu card",
    answer: 3
  },
  {
    question: "Who is my favorite musician or band?",
    choice1: " Billie Eilish",
    choice2: " Taylor Swift  ",
    choice3: " Rosie ",
    choice4: " BEYONCE",
    answer: 3
  }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();