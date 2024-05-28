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
    console.log(this.props)
    this.shadowRoot.querySelector('p').innerHTML = this.props.content || '';
  }
}

customElements.define('text-block', TextBlock);
