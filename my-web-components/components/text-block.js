// /components/text-block.js
class TextBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {};
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
    this.shadowRoot.innerHTML = `
      <style>
        .text-block {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      </style>
      <div class="text-block">
        <p>${this.state.content || ''}</p>
      </div>
    `;
  }
}

customElements.define('text-block', TextBlock);
