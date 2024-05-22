document.addEventListener('DOMContentLoaded', () => {
    const blockContainer = document.querySelector('.block-container');

    // Example blocks
    const blocks = [
        { type: 'video', content: 'Video Block' },
        { type: 'text', content: 'Text Block' },
        { type: 'swap', content: 'Swap Activity Block' }
    ];

    blocks.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.className = 'block';
        blockElement.textContent = block.content;
        blockContainer.appendChild(blockElement);
    });
});
