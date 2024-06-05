(function() {
  class SwapButtonsBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.props = {};
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
      const container = this.shadowRoot.querySelector('.swap-buttons-block');
      container.innerHTML = '';

      if (this.props.buttons) {
        this.props.buttons.forEach((buttonText, index) => {
          const button = document.createElement('button');
          button.textContent = buttonText;
          button.addEventListener('click', () => this.handleButtonClick(index));
          container.appendChild(button);
        });
      }
    }

    handleButtonClick(index) {
      this.trackData(this.props.guid, index);
      console.log('datatracking -bd', window.datatracking);
    }

    trackData(guid, index) {
      const customData = { [guid]: index };
      if (window.datatracking && typeof window.datatracking.setCustomData === 'function') {
        const currentData = window.datatracking.customData || {};
        window.datatracking.setCustomData({ data: { courseData: { customData: { ...currentData, ...customData } } } });
      }
    }
  }

  customElements.define('swap-buttons-block', SwapButtonsBlock);
})();
