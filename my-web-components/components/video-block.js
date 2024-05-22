// /components/video-block.js
export class VideoBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.state = {};
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
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .video-block {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          background-color: var(--video-block-color);
          margin: 50px;
        }
        video {
          width: 50%;
          height: 100%;
          object-fit: cover;
        }
      </style>
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
