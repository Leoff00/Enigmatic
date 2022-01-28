const questionsMessages = [
  {
    question: "What the name of the object to open many doors?",
  },

  {
    question: "What is the name of the best teleport movie?",
  },

  {
    question: "What is the name of the monster that has 3 heads",
  },
];

let successMessages = [
  "You nailed it, right question!",
  "All right, correct answer!",
  "Do you have superpowah? Good job!",
  "Very good! Keep going!",
];

const DEFAULT_INITIAL_QUESTION = "What the favourite food of the dog?";
const DEFAULT_WRONG_PHRASE = "Wrong answer :(";
const DEFAULT_NO_INPUT_DATA_PHRASE = "Please enter with some answer.";
const DEFAULT_WORD_ALREADY_ANSWERED = "You already answered this.";
const DEFAULT_SCORE_PHRASE = "Your Score: ";
const DEFAULT_END_GAME_PHRASE = "You answer all the words. Congrats!!!";
const END_GAME_CONDITION_NUMBER = 5;

class Enigmatic {
  #questionParagraph = this.QueryFactory("#question");
  #answerParagraph = this.QueryFactory("#answer");
  #txtInput = this.QueryFactory("#txtInput");
  #statusMessage = this.QueryFactory("#successMessage");
  #btnSubmit = this.QueryFactory("#btnSubmit");

  #answers = { meat: false, key: false, jumper: false, face: false };
  #counter = 1;

  constructor() {
    this.Main();
  }

  Main() {
    this.showTextsInHTML();
  }

  QueryFactory(element) {
    return document.querySelector(element);
  }

  #setUpQuestions(questionsObject) {
    for (let question of questionsObject) {
      this.#setQuestionsParagraph(question.question);
    }
  }

  #unstackQuestionMessages() {
    console.log(questionsMessages);
    console.log("popping and unstack");
    questionsMessages.shift();
  }

  #randomizeSuccessMessages() {
    const randomizer = Math.floor(Math.random() * successMessages.length);
    return successMessages[randomizer];
  }

  #setEndGame() {
    if (this.#counter === END_GAME_CONDITION_NUMBER) {
      this.#setQuestionsParagraph(DEFAULT_END_GAME_PHRASE);
      return;
    }
  }

  #incrementCounter() {
    return this.#counter++;
  }

  #validateCorrectAnswer() {
    this.#setWordAnswered(this.#txtInput);
    this.#setStatusMessage();
    this.#setUpQuestions(questionsMessages);
    this.#unstackQuestionMessages();
    this.#setScoreCounterMessage(
      DEFAULT_SCORE_PHRASE,
      this.#incrementCounter(),
    );

    this.#setEndGame();
  }

  submitAnswers() {
    if (!this.#hasWords())
      return this.#setStatusMessageParagraph(DEFAULT_NO_INPUT_DATA_PHRASE);

    if (this.#isWordMatches() && !this.#isAnsweredWithWord()) {
      this.#validateCorrectAnswer();
      return;
    }

    if (this.#isAnsweredWithWord()) {
      return this.#setStatusMessageParagraph(DEFAULT_WORD_ALREADY_ANSWERED);
    }

    this.#setStatusMessageParagraph(DEFAULT_WRONG_PHRASE);
  }

  #isWordMatches = () =>
    Object.freeze(this.#answers.hasOwnProperty(this.#txtInput));

  #isAnsweredWithWord = () =>
    this.#isWordMatches() && this.#answers[this.#txtInput];

  #setStatusMessage = () => {
    const randomizeStatusMessage = this.#randomizeSuccessMessages();
    this.#statusMessage.innerHTML = randomizeStatusMessage;
  };

  #setScoreCounterMessage = (scorePhrase, score) =>
    (this.#answerParagraph.innerHTML = `${scorePhrase} ${parseInt(score)}`);

  #setWordAnswered = (key) => (this.#answers[key] = true);

  #setStatusMessageParagraph = (statusParagraph) =>
    (this.#statusMessage.innerHTML = statusParagraph);

  #setQuestionsParagraph = (questionPhrase) =>
    (this.#questionParagraph.innerHTML = questionPhrase);

  #setTxtInputValue = () =>
    (this.#txtInput = this.QueryFactory("#txtInput").value.toLowerCase());

  #hasWords = () => this.#txtInput.length > 0;

  #execute(event) {
    if (event) event.preventDefault();

    this.#setTxtInputValue();
    this.submitAnswers();
  }

  showTextsInHTML() {
    document.addEventListener(
      "keypress",
      (event) => event.key === "Enter" && this.#execute(),
    );
    this.#btnSubmit.addEventListener("click", (event) => this.#execute(event));
  }
}

const game = new Enigmatic();
