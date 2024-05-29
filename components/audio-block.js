// /components/audio-block.js

export default class AudioBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.props = { src: '' };
    this.shadowRoot.innerHTML = `
      <style>
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        .audio-block {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        audio {
          width: 100%;
        }
      </style>
      <div class="audio-block">
        <audio controls>
          <source src="" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
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
  }

  render() {
    const audioElement = this.shadowRoot.querySelector('audio source');
    audioElement.src = this.props.src || '';
  }
}

customElements.define('audio-block', AudioBlock);
