// /components/swap-block.js
export class SwapBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = { items: [] };
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
    const items = this.state.items || [];
    const buttons = items.map((item, index) => `<button data-index="${index}">${item.header}</button>`).join('');
    const bodies = items.map((item, index) => `<div class="content" data-index="${index}">${item.body}</div>`).join('');

    this.shadowRoot.innerHTML = `
      <style>
        .swap-block {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        .content {
          display: none;
        }
        .content.active {
          display: block;
        }
      </style>
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
