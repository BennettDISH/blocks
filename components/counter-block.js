// /components/counter-block.js
(function() {
  class CounterBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = { count: 0 };
      this.shadowRoot.innerHTML = `
        <style>
          .counter-block {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          button {
            margin-top: 10px;
            padding: 10px 20px;
            cursor: pointer;
          }
        </style>
        <div class="counter-block">
          <p>Count: 0</p>
          <button>Increment</button>
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
      this.shadowRoot.querySelector('button').addEventListener('click', this.handleButtonClick.bind(this));
      window.addEventListener('datatracking', this.handleDataTrackingEvent.bind(this));
    }

    disconnectedCallback() {
      this.shadowRoot.querySelector('button').removeEventListener('click', this.handleButtonClick.bind(this));
      window.removeEventListener('datatracking', this.handleDataTrackingEvent.bind(this));
    }

    handleButtonClick() {
      this.state.count += 1;
      this.render();
      this.trackData();
    }

    handleDataTrackingEvent(event) {
      if (event.detail && event.detail.customData && typeof event.detail.customData.count !== 'undefined') {
        this.state.count = event.detail.customData.count;
        this.render();
      }
    }

    trackData() {
      const detail = {
        customData: { count: this.state.count }
      };
      const datatrackingEvent = new CustomEvent('datatracking', { detail });
      window.dispatchEvent(datatrackingEvent);
    }

    render() {
      this.shadowRoot.querySelector('p').textContent = `Count: ${this.state.count}`;
    }
  }

  customElements.define('counter-block', CounterBlock);
})();
