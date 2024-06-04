(function() {
  class SwapTextBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = { textBlocks: [] };
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
      this.state = value;
      this.render();
    }

    get data() {
      return this.state;
    }

    connectedCallback() {
      this.render();
      window.addEventListener('datatracking', this.handleDataTrackingEvent.bind(this));
    }

    disconnectedCallback() {
      window.removeEventListener('datatracking', this.handleDataTrackingEvent.bind(this));
    }

    handleDataTrackingEvent(event) {
      if (event.detail && event.detail.customData && typeof event.detail.customData.selectedGuid !== 'undefined') {
        this.render(event.detail.customData.selectedGuid);
      }
    }

    render(activeGuid = null) {
      const container = this.shadowRoot.querySelector('.swap-text-blocks');
      container.innerHTML = '';

      this.state.textBlocks.forEach(block => {
        const div = document.createElement('div');
        div.classList.add('swap-text-block');
        if (block.guid === activeGuid) {
          div.classList.add('active');
        }
        div.innerHTML = block.content;
        container.appendChild(div);
      });
    }
  }

  customElements.define('swap-text-block', SwapTextBlock);
})();
