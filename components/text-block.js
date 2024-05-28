// /components/text-block.js

export default class TextBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.props = {};
    this.shadowRoot.innerHTML = `
      <style>
        .text-block {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: var(--text-block-padding, 16px);
          font-family: var(--text-block-font-family, 'Roboto', sans-serif);
          font-size: var(--text-block-font-size, 1rem);
          color: var(--text-block-color, #000);
          background-color: var(--text-block-background-color);
        }
      </style>
      <div class="text-block">
        <p></p>
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
  }

  render() {
    this.shadowRoot.querySelector('p').innerHTML = this.props.content || '';
  }
}

customElements.define('text-block', TextBlock);
