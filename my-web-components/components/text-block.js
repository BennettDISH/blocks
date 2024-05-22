// /components/text-block.js
export class TextBlock extends HTMLElement {
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
            border: 1px solid #ccc;
            padding: 20px;
            background-color: #fff;
            width: 100%;
            text-align: center;
          }
        </style>
        <div class="text-block">
          <p>${this.state.content}</p>
        </div>
      `;
    }
  }
  
  customElements.define('text-block', TextBlock);
  