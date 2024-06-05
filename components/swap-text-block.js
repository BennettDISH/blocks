(function() {
  class SwapTextBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.props = {};
      this.shadowRoot.innerHTML = `
        <style>
          .swap-text-block {
            display: none;
          }
          .swap-text-block.active {
            display: block;
          }
        </style>
        <div class="swap-text-blocks"></div>
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
      window.addEventListener('datatracking', this.handleDataTrackingEvent.bind(this));
    }

    disconnectedCallback() {
      window.removeEventListener('datatracking', this.handleDataTrackingEvent.bind(this));
    }

    handleDataTrackingEvent(event) {
      const customData = event.detail?.customData;
      if (customData && typeof customData[this.props.guid] !== 'undefined') {
        this.render(customData[this.props.guid]);
      }
    }

    render(activeIndex = null) {
      const container = this.shadowRoot.querySelector('.swap-text-blocks');
      container.innerHTML = '';

      this.props.textBlocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.classList.add('swap-text-block');
        if (index === activeIndex) {
          div.classList.add('active');
        }
        div.innerHTML = block;
        container.appendChild(div);
      });
    }
  }

  customElements.define('swap-text-block', SwapTextBlock);
})();
