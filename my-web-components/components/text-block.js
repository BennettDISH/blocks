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
          <p>${this.state.content || ''}</p>
        </div>
      `;
    }
  }
  
  if (!customElements.get('text-block')) {
    customElements.define('text-block', TextBlock);
  }
  