// /components/swap-block.js

  export default  class SwapBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = { items: [] };
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
      const container = this.shadowRoot.querySelector('.swap-block');
      container.innerHTML = '';

      const buttons = this.state.items.map((item, index) => `<button data-index="${index}">${item.header}</button>`).join('');
      const bodies = this.state.items.map((item, index) => `<div class="content" data-index="${index}">${item.body}</div>`).join('');

      container.innerHTML = `${buttons}${bodies}`;

      const buttonElements = container.querySelectorAll('button');
      const contentElements = container.querySelectorAll('.content');

      buttonElements.forEach(button => {
        button.addEventListener('click', () => {
          const index = button.getAttribute('data-index');
          contentElements.forEach(content => content.classList.remove('active'));
          container.querySelector(`.content[data-index="${index}"]`).classList.add('active');
        });
      });
    }
  }

  customElements.define('swap-block', SwapBlock);

