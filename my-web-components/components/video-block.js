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
        <style>
          .video-block {
            border: 1px solid #ccc;
            padding: 20px;
            background-color: #fff;
            width: 100%;
            text-align: center;
          }
          video {
            width: 100%;
            height: auto;
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
  
  customElements.define('video-block', VideoBlock);
  