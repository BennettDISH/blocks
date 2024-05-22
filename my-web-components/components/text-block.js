// /components/text-block.js
export class TextBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {};
  }

  set data(value) {
    console.log('TextBlock received data:', value);
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
    console.log('TextBlock render called with state:', this.state);
    this.shadowRoot.innerHTML = `
      <div class="text-block">
        <p>${this.state.content || ''}</p>
      </div>
    `;
  }
}

if (!customElements.get('text-block')) {
  customElements.define('text-block', TextBlock);
}
