// /components/text-block.js
(function() {
  class TextBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = {};
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
      this.shadowRoot.querySelector('p').textContent = this.state.content || '';
    }
  }

  customElements.define('text-block', TextBlock);
})();
