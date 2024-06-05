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
    
    render(activeIndex = null) {
      const container = this.shadowRoot.querySelector('.swap-text-blocks');
      container.innerHTML = '';
      console.log('linkedGuid', window.datatracking.data.customData[this.props.linkedGuid])
      
      this.props.textBlocks.forEach((block, index) => {
        const div = document.createElement('div');
        div.classList.add('swap-text-block');
        if (index === window.datatracking.data.customData[this.props.linkedGuid]) {
          div.classList.add('active');
        }
        div.innerHTML = block;
        container.appendChild(div);
      });
    }
  }

  customElements.define('swap-text-block', SwapTextBlock);
})();
