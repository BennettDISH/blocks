// /components/mc-question.js
(function() {
  class McQuestion extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = { question: '', options: [], correctAnswer: null, selectedAnswer: null };
      this.shadowRoot.innerHTML = `
        <style>
          .mc-question {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
          .question {
            font-weight: bold;
          }
          .option {
            display: block;
            margin: 5px 0;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
            cursor: pointer;
          }
          .option.selected {
            border-color: #007bff;
          }
          .option.correct {
            border-color: #28a745;
            background-color: #d4edda;
          }
          .option.incorrect {
            border-color: #dc3545;
            background-color: #f8d7da;
          }
        </style>
        <div class="mc-question">
          <div class="question"></div>
          <div class="options"></div>
        </div>
      `;
    }

    set data(value) {
      this.state = value;
      this.render();
    }

    get data() {
      return this.state;
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const { question, options, selectedAnswer, correctAnswer } = this.state;
      this.shadowRoot.querySelector('.question').textContent = question;

      const optionsContainer = this.shadowRoot.querySelector('.options');
      optionsContainer.innerHTML = options.map((option, index) => {
        const isSelected = selectedAnswer === index ? 'selected' : '';
        const isCorrect = selectedAnswer === index && index === correctAnswer ? 'correct' : '';
        const isIncorrect = selectedAnswer === index && index !== correctAnswer ? 'incorrect' : '';
        return `<button class="option ${isSelected} ${isCorrect} ${isIncorrect}" data-index="${index}">${option}</button>`;
      }).join('');

      optionsContainer.querySelectorAll('.option').forEach(button => {
        button.addEventListener('click', () => {
          this.state.selectedAnswer = parseInt(button.getAttribute('data-index'), 10);
          this.render();
        });
      });
    }
  }

  customElements.define('mc-question', McQuestion);
})();
