// /components/video-block.js
export class VideoBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {};
  }

  set data(value) {
    console.log('VideoBlock received data:', value);
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
    console.log('VideoBlock render called with state:', this.state);
    this.shadowRoot.innerHTML = `
      <div class="video-block">
        <video controls>
          <source src="${this.state.src || ''}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
    `;
  }
}

if (!customElements.get('video-block')) {
  customElements.define('video-block', VideoBlock);
}
