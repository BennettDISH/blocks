// /components/video-block.js

export default  class VideoBlock extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.state = {};
      this.shadowRoot.innerHTML = `
        <style>
          .video-block {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        </style>
        <div class="video-block">
          <video controls>
            <source src="" type="video/mp4">
            Your browser does not support the video tag.
          </video>
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
    }

    render() {
      this.shadowRoot.querySelector('video source').src = this.state.src || '';
    }
  }

  customElements.define('video-block', VideoBlock);

