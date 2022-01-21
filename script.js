let questions = [
  "What the favourite food of the dog?",
  "What the name of the object to open many doors?",
];

let successMessages = [
  "You nailed it, right question!",
  "All right, correct answer!",
  "Do you have superpowah? Good job!",
  "Very good! Keep going!",
];

const DEFAULT_WRONG_PHRASE = "Wrong answer :(";
const DEFAULT_NO_INPUT_DATA_PHRASE = "Please enter with some answer.";
const DEFAULT_WORD_ALREADY_ANSWERED = "You already answered this.";
const DEFAULT_SCORE_PHRASE = "Your Score: ";

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

  #randomizeSuccessMessages() {
    const randomizer = Math.floor(Math.random() * successMessages.length);
    return successMessages[randomizer];
  }

  submitAnswer() {
    if (!this.#hasWords())
      return this.#setStatusMessageParagraph(DEFAULT_NO_INPUT_DATA_PHRASE);

    if (this.#isWordMatches() && !this.#isAnsweredWithWord()) {
      this.#setWordAnswered(this.#txtInput);
      this.#setStatusMessage();
      this.#setScoreCounter(DEFAULT_SCORE_PHRASE, this.#counter++);
      return;
    }

    if (this.#isAnsweredWithWord())
      return this.#setStatusMessageParagraph(
        `${DEFAULT_WORD_ALREADY_ANSWERED}`,
      );

    this.#setStatusMessageParagraph(DEFAULT_WRONG_PHRASE);
  }

  #isWordMatches = () => this.#answers.hasOwnProperty(this.#txtInput);

  #isAnsweredWithWord = () =>
    this.#isWordMatches() && this.#answers[this.#txtInput];

  #setStatusMessage = () => {
    const randomizeStatusMessage = this.#randomizeSuccessMessages();
    this.#statusMessage.innerHTML = randomizeStatusMessage;
  };

  #setScoreCounter = (scorePhrase, score) =>
    (this.#answerParagraph.innerHTML = `${scorePhrase} ${score}`);

  #setWordAnswered = (key) => (this.#answers[key] = true);

  #setStatusMessageParagraph = (text) => (this.#statusMessage.innerHTML = text);

  #setTxtInputValue = () =>
    (this.#txtInput = this.QueryFactory("#txtInput").value.toLowerCase());

  #hasWords = () => this.#txtInput.length > 0;

  #execute(event) {
    if (event) event.preventDefault();

    this.#setTxtInputValue();
    this.submitAnswer();
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
