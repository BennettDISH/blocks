class SwapBlock extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .swap-block {
                    border: 1px solid #ccc;
                    padding: 20px;
                    background-color: #fff;
                    width: 100%;
                    text-align: center;
                }
                .content {
                    display: none;
                }
                .content.active {
                    display: block;
                }
            </style>
            <div class="swap-block">
                <button>Swap Content</button>
                <div class="content">${this.getAttribute('content1')}</div>
                <div class="content">${this.getAttribute('content2')}</div>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector('button');
        const contents = this.shadowRoot.querySelectorAll('.content');
        let activeIndex = 0;
        contents[activeIndex].classList.add('active');

        button.addEventListener('click', () => {
            contents[activeIndex].classList.remove('active');
            activeIndex = (activeIndex + 1) % contents.length;
            contents[activeIndex].classList.add('active');
        });
    }
}

customElements.define('swap-block', SwapBlock);
