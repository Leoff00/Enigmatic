let answers = ["Meat", "Key", "Jumper", "Face"];
let questions = [
  "What the favourite food of the dog?",
  "What the name of the object to open many doors?",
];

const successMessages = [
  "You nailed it, right question!",
  "All right, correct answer!",
  "Do you have superpowah? Good job!",
  "Very good! Keep going!",
];

const DEFAULT_WRONG_PHRASE = "Wrong answer :(";
const DEFAULT_NO_INPUT_DATA_PHRASE = "Please enter with some answer.";

class Enigmatic {
  #questionParagraph = this.QueryFactory("#question");
  #answerParagraph = this.QueryFactory("#answer");
  #txtInput = this.QueryFactory("#txtInput");
  #statusMessage = this.QueryFactory("#successMessage");
  #btnSubmit = this.QueryFactory("#btnSubmit");

  constructor() {
    this.main();
  }

  main() {
    this.showTextsInHTML();
    // this.showQuestions();
  }

  QueryFactory(element) {
    return document.querySelector(element);
  }

  showQuestions() {
    for (let index = 0; index < questions.length; index++) {
      this.#questionParagraph.innerHTML = questions[index];
    }
  }

  randomizeSuccessMessages() {
    const randomizer = Math.floor(Math.random() * successMessages.length);
    return successMessages[randomizer];
  }

  checkIfHaveInputs(event) {
    event.preventDefault();

    if (!this.#txtInput.value) {
      return (this.#answerParagraph.innerHTML = DEFAULT_NO_INPUT_PHRASE);
    }
  }

  submitAnswer(event) {
    event.preventDefault();

    const cloneAnswers = [...answers];

    for (let index = 0; index < cloneAnswers.length; index++) {
      if (this.#txtInput.value === cloneAnswers[index]) {
        console.log(cloneAnswers);
        const unstackArray = answers.shift();
        console.log(unstackArray);
        return (this.#statusMessage.innerHTML =
          this.randomizeSuccessMessages());
      } else {
        return (this.#statusMessage.innerHTML = DEFAULT_WRONG_PHRASE);
      }
    }

    return checkAnswer;
  }

  showTextsInHTML() {
    this.#btnSubmit.addEventListener("click", (event) => {
      this.submitAnswer(event);
      this.checkIfHaveInputs(event);
    });
  }
}

const game = new Enigmatic();
