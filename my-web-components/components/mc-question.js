// /components/mc-question.js
class McQuestion extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = { question: '', options: [], correctAnswer: null, selectedAnswer: null };
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
      const optionsHtml = options.map((option, index) => {
        const isSelected = selectedAnswer === index ? 'selected' : '';
        const isCorrect = selectedAnswer === index && index === correctAnswer ? 'correct' : '';
        const isIncorrect = selectedAnswer === index && index !== correctAnswer ? 'incorrect' : '';
        return `<button class="option ${isSelected} ${isCorrect} ${isIncorrect}" data-index="${index}">${option}</button>`;
      }).join('');
  
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
          <div class="question">${question}</div>
          <div class="options">${optionsHtml}</div>
        </div>
      `;
  
      this.shadowRoot.querySelectorAll('.option').forEach(button => {
        button.addEventListener('click', () => {
          const index = parseInt(button.getAttribute('data-index'), 10);
          this.state.selectedAnswer = index;
          this.render();
        });
      });
    }
  }
  
  customElements.define('mc-question', McQuestion);
  