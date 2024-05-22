// /components/swap-block.js
export class SwapBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = {};
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
      const button = this.shadowRoot.querySelector('button');
      const contents = this.shadowRoot.querySelectorAll('.content');
      let activeIndex = 0;
      contents[activeIndex].classList.add('active');
  
      button.addEventListener('click', () => {
        contents[activeIndex].classList.remove('active');
        activeIndex = (activeIndex + 1) % contents.length;
        contents[activeIndex].classList.add('active');
      });
    }
  
    render() {
      console.log('SwapBlock render called with state:', this.state);
      this.shadowRoot.innerHTML = `
        <style>
          .swap-block {
            border: 1px solid #ccc;
            padding: 20px;
            background-color: #fff;
            width: 100%;
            text-align: center;
          }
          .content {
            display: none;
          }
          .content.active {
            display: block;
          }
        </style>
        <div class="swap-block">
          <button>Swap Content</button>
          <div class="content">${this.state.content1 || ''}</div>
          <div class="content">${this.state.content2 || ''}</div>
        </div>
      `;
    }
  }
  
  customElements.define('swap-block', SwapBlock);
  