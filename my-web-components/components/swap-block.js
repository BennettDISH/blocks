// /components/swap-block.js
export class SwapBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = { items: [] };
  }

  set data(value) {
    console.log('SwapBlock received data:', value);
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
    console.log('SwapBlock render called with state:', this.state);
    const items = this.state.items || [];

    const buttons = items.map((item, index) => {
      return `<button data-index="${index}">${item.header}</button>`;
    }).join('');

    const bodies = items.map((item, index) => {
      return `<div class="content" data-index="${index}">${item.body}</div>`;
    }).join('');

    this.shadowRoot.innerHTML = `
      <div class="swap-block">
        ${buttons}
        ${bodies}
      </div>
    `;

    const buttonElements = this.shadowRoot.querySelectorAll('button');
    const contentElements = this.shadowRoot.querySelectorAll('.content');

    buttonElements.forEach(button => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        contentElements.forEach(content => content.classList.remove('active'));
        this.shadowRoot.querySelector(`.content[data-index="${index}"]`).classList.add('active');
      });
    });
  }
}

if (!customElements.get('swap-block')) {
  customElements.define('swap-block', SwapBlock);
}
