// /main.js
import { TextBlock } from './my-web-components/components/text-block.js';
import { VideoBlock } from './my-web-components/components/video-block.js';
import { SwapBlock } from './my-web-components/components/swap-block.js';

customElements.define('text-block', TextBlock);
customElements.define('video-block', VideoBlock);
customElements.define('swap-block', SwapBlock);
