// /components/counter-block.js

export default class CounterBlock extends HTMLElement {
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
          padding: var(--button-padding, 10px 20px);
          margin-top: var(--button-margin, 10px);
          cursor: pointer;
        }
      </style>
      <div class="counter-block">
        <p>Count: 0</p>
        <button>Increment</button>
      </div>
    `;
  }

  set data(props) {
    this.props = props;
    this.render();
  }

  get data() {
    return this.props;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('button').addEventListener('click', this.handleButtonClick);
    window.addEventListener('datatracking', this.handleDataTrackingEvent);
  }

  disconnectedCallback() {
    window.removeEventListener('datatracking', this.handleDataTrackingEvent);
  }

  handleButtonClick = () => {
    this.state.count += 1;
    this.render();
    this.trackData();
  }

  handleDataTrackingEvent = (event) => {
    if (event.detail && event.detail.customData && typeof event.detail.customData.count !== 'undefined') {
      this.state.count = event.detail.customData.count;
      this.render();
    }
  }

  trackData() {
    window.datatracking?.setCustomData({ count: this.state.count });
  }

  render() {
    this.shadowRoot.querySelector('p').textContent = `Count: ${this.state.count}`;
  }
}

customElements.define('counter-block', CounterBlock);
