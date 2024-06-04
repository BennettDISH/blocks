(function() {
  class SwapButtonsBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = { buttons: [] };
      this.shadowRoot.innerHTML = `
        <style>
          .swap-buttons-block {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          button {
            margin: 5px;
            padding: 10px 20px;
            cursor: pointer;
          }
        </style>
        <div class="swap-buttons-block"></div>
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
      const container = this.shadowRoot.querySelector('.swap-buttons-block');
      container.innerHTML = '';

      this.state.buttons.forEach((buttonText, index) => {
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.addEventListener('click', () => this.handleButtonClick(index));
        container.appendChild(button);
      });
    }

    handleButtonClick(index) {
      const detail = {
        customData: { selectedIndex: index }
      };
      const datatrackingEvent = new CustomEvent('datatracking', { detail });
      window.dispatchEvent(datatrackingEvent);
    }
  }

  customElements.define('swap-buttons-block', SwapButtonsBlock);
})();
