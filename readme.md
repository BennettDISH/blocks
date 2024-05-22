# Block Library

A library of custom web components that can be used to build fully functional websites. This library includes various types of blocks such as video blocks, text blocks, and swap activity blocks.

## Usage

To use the components in your project, link to the scripts hosted on our site and use the custom elements in your HTML.

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Using Block Library</title>
    <script src="https://yourdomain.com/video-block.js" defer></script>
    <script src="https://yourdomain.com/text-block.js" defer></script>
    <script src="https://yourdomain.com/swap-block.js" defer></script>
</head>
<body>
    <video-block src="https://yourdomain.com/path/to/video.mp4"></video-block>
    <text-block content="This is a text block."></text-block>
    <swap-block content1="Content 1" content2="Content 2"></swap-block>
</body>
</html>
