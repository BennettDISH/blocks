// /main.js
import { TextBlock } from './my-web-components/components/text-block.js';
import { VideoBlock } from './my-web-components/components/video-block.js';
import { SwapBlock } from './my-web-components/components/swap-block.js';

if (!customElements.get('text-block')) {
  customElements.define('text-block', TextBlock);
}
if (!customElements.get('video-block')) {
  customElements.define('video-block', VideoBlock);
}
if (!customElements.get('swap-block')) {
  customElements.define('swap-block', SwapBlock);
}