// /components/mc-question.js

export default class McQuestion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.props = { question: '', options: [], correctAnswer: null, selectedAnswer: null };
    this.eventListeners = []; // Track event listeners for cleanup
    this.shadowRoot.innerHTML = `
      <style>
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        .mc-question {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .question {
          font-weight: bold;
          font-family: var(--font-family, 'Roboto', sans-serif);
        }
        .option {
          display: block;
          margin: 5px 0;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: var(--border-radius, 4px);
          background-color: var(--secondary-color, #fff);
          cursor: pointer;
        }
        .option.selected {
          border-color: var(--accent-color, #007bff);
        }
        .option.correct {
          border-color: var(--success-color, #28a745);
          background-color: #d4edda;
        }
        .option.incorrect {
          border-color: var(--error-color, #dc3545);
          background-color: #f8d7da;
        }
        .feedback {
          margin-top: 10px;
          font-family: var(--font-family, 'Roboto', sans-serif);
        }
        button.submit-button {
          margin-top: 10px;
          padding: var(--button-padding, 10px 20px);
          cursor: pointer;
          background-color: var(--accent-color, #007bff);
          color: #fff;
          border: none;
          border-radius: var(--border-radius, 4px);
        }
      </style>
      <div class="mc-question" role="region" aria-label="Multiple Choice Question">
        <div class="question" id="question-text"></div>
        <div class="options"></div>
        <button class="submit-button">Submit</button>
        <div class="feedback"></div>
      </div>
    `;
  }

  set data(value) {
    this.props = value;
    this.render();
  }

  get data() {
    return this.props;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.submit-button').addEventListener('click', this.handleSubmit);
  }

  disconnectedCallback() {
    this.cleanupEventListeners();
  }

  cleanupEventListeners() {
    this.eventListeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.eventListeners = [];
  }

  handleOptionClick = (event) => {
    const index = parseInt(event.target.getAttribute('data-index'), 10);
    this.props.selectedAnswer = index;
    this.render();
  }

  handleSubmit = () => {
    const feedbackElement = this.shadowRoot.querySelector('.feedback');
    if (this.props.selectedAnswer === this.props.correctAnswer) {
      feedbackElement.textContent = 'Correct!';
      feedbackElement.style.color = 'var(--success-color, #28a745)';
    } else {
      feedbackElement.textContent = 'Incorrect!';
      feedbackElement.style.color = 'var(--error-color, #dc3545)';
    }
  }

  render() {
    const { question, options, selectedAnswer } = this.props;
    this.shadowRoot.querySelector('.question').textContent = question;

    const optionsContainer = this.shadowRoot.querySelector('.options');
    optionsContainer.innerHTML = options.map((option, index) => {
      const isSelected = selectedAnswer === index ? 'selected' : '';
      return `<button class="option ${isSelected}" data-index="${index}" role="option" aria-selected="${isSelected === 'selected'}">
                ${option}
              </button>`;
    }).join('');

    const buttonElements = optionsContainer.querySelectorAll('.option');

    // Cleanup old event listeners
    this.cleanupEventListeners();

    buttonElements.forEach(button => {
      const handler = this.handleOptionClick.bind(this);
      button.addEventListener('click', handler);
      this.eventListeners.push({ element: button, event: 'click', handler });
    });
  }
}

customElements.define('mc-question', McQuestion);
