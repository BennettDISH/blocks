// /main.js
import { TextBlock } from './components/text-block.js';
import { VideoBlock } from './components/video-block.js';
import { SwapBlock } from './components/swap-block.js';

if (!customElements.get('text-block')) {
  customElements.define('text-block', TextBlock);
}
if (!customElements.get('video-block')) {
  customElements.define('video-block', VideoBlock);
}
if (!customElements.get('swap-block')) {
  customElements.define('swap-block', SwapBlock);
}
