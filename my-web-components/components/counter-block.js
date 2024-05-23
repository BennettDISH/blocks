// /components/counter-block.js
export class CounterBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = { count: 0 };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleDataTrackingEvent = this.handleDataTrackingEvent.bind(this);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', this.handleButtonClick);
    window.addEventListener('datatracking', this.handleDataTrackingEvent);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('button').removeEventListener('click', this.handleButtonClick);
    window.removeEventListener('datatracking', this.handleDataTrackingEvent);
  }

  handleButtonClick() {
    this.state.count += 1;
    this.dispatchEvent(new CustomEvent('updatecount', {
      detail: { count: this.state.count },
      bubbles: true,
      composed: true
    }));
    this.render();
  }

  handleDataTrackingEvent(event) {
    if (event.detail && event.detail.customData && typeof event.detail.customData.count !== 'undefined') {
      this.state.count = event.detail.customData.count;
      this.render();
    }
  }

  render() {
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
        <p>Count: ${this.state.count}</p>
        <button>Increment</button>
      </div>
    `;
  }
}

if (!customElements.get('counter-block')) {
  customElements.define('counter-block', CounterBlock);
}
