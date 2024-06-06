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
      window.addEventListener('swap-update', this.handleSwapUpdate.bind(this));
      console.log('SwapTextBlock connected, listening for swap-update events');
    }
    
    disconnectedCallback() {
      window.removeEventListener('swap-update', this.handleSwapUpdate.bind(this));
      console.log('SwapTextBlock disconnected, stopped listening for swap-update events');
    }

    handleSwapUpdate(event) {
      const { linkedGuid, activeIndex } = event.detail;
      console.log('Received swap-update event:', event.detail);
      if (this.props.linkedGuid === linkedGuid) {
        console.log('Updating SwapTextBlock with activeIndex:', activeIndex);
        this.render(activeIndex);
      }
    }
    
    render(activeIndex = null) {
      const container = this.shadowRoot.querySelector('.swap-text-blocks');
      container.innerHTML = '';
      console.log('Rendering SwapTextBlock with activeIndex:', activeIndex);
      console.log('linkedGuid data:', window.datatracking.data.customData[this.props.linkedGuid]);

      this.props.textBlocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.classList.add('swap-text-block');
        if (index === activeIndex || index === window.datatracking.data.customData[this.props.linkedGuid]) {
          div.classList.add('active');
        }
        div.innerHTML = block;
        container.appendChild(div);
      });
    }
  }

  customElements.define('swap-text-block', SwapTextBlock);
})();
