// /components/intro-block.js

export default class IntroBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.props = { content: '', buttonLabel: 'Start' };
    this.shadowRoot.innerHTML = `
      <style>
        .intro-block {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: var(--secondary-color, #fff);
          color: var(--primary-color, #000);
          padding: var(--padding, 20px);
          font-family: var(--font-family, 'Roboto', sans-serif);
          transition: opacity 0.5s ease-out;
          position: relative;
          z-index: 99;
        }
        .hidden {
          opacity: 0;
          visibility: hidden;
        }
        button {
          padding: var(--button-padding, 10px 20px);
          margin-top: var(--button-margin, 10px);
          cursor: pointer;
          background-color: var(--accent-color, #007bff);
          color: #fff;
          border: none;
          border-radius: var(--border-radius, 4px);
        }
      </style>
      <div class="intro-block">
        <div class="content"></div>
        <button></button>
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
    this.shadowRoot.querySelector('button').addEventListener('click', this.hideIntroBlock);
  }

  hideIntroBlock = () => {
    const introBlock = this.shadowRoot.querySelector('.intro-block');
    introBlock.classList.add('hidden');
    setTimeout(() => {
      introBlock.style.display = 'none';
    }, 500); // Match the transition duration
  }

  render() {
    const contentElement = this.shadowRoot.querySelector('.content');
    contentElement.innerHTML = this.props.content || '';

    const buttonElement = this.shadowRoot.querySelector('button');
    buttonElement.textContent = this.props.buttonLabel || 'Start';
  }
}

customElements.define('intro-block', IntroBlock);
