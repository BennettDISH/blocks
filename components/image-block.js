// /components/image-block.js

export default class ImageBlock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.props = { src: '', alt: '' };
    this.shadowRoot.innerHTML = `
      <style>
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        .image-block {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }
        img {
          max-width: 100%;
          max-height: 100%;
        }
      </style>
      <div class="image-block">
        <img src="" alt="">
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
    const imgElement = this.shadowRoot.querySelector('img');
    imgElement.src = this.props.src || '';
    imgElement.alt = this.props.alt || '';
  }
}

customElements.define('image-block', ImageBlock);
