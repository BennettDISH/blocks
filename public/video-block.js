class VideoBlock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
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
                    <source src="${this.getAttribute('src')}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('video-block', VideoBlock);
