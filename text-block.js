class TextBlock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .text-block {
                    border: 1px solid #ccc;
                    padding: 20px;
                    background-color: #fff;
                    width: 100%;
                    text-align: center;
                }
            </style>
            <div class="text-block">
                <p>${this.getAttribute('content')}</p>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('text-block', TextBlock);
