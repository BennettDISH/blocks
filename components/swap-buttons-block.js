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

      console.log("button block props -BD", this.props)

      this.props.buttons.forEach(buttonData => {
        const button = document.createElement('button');
        button.textContent = buttonData.label;
        button.addEventListener('click', () => this.handleButtonClick(this.props.guid));
        container.appendChild(button);
      });
    }

    handleButtonClick(guid) {
      this.trackData(guid);
      console.log('datatracking -bd', window.datatracking)
    }

    trackData(guid) {
      const buttonGuids = this.props.buttons.map(button => ({
        guid: guid,
        selected: button.guid === guid
      }));

      window.datatracking?.setCustomData({ buttonGuids });
    }
  }

  customElements.define('swap-buttons-block', SwapButtonsBlock);
})();
