# Custom Web Components

## Project Structure

- /components
  - text-block.js
  - video-block.js
  - swap-block.js
  - counter-block.js
  - mc-question.js
- index.html
- main.js
- styles.css

## How to Use

1. Serve the project files using a web server (e.g., http-server).

2. Open `index.html` in your browser to see the components in action.

3. You can also import and use these components in another project by including `main.js` as a module.

## Component Documentation

### TextBlock Component

- **Description**: A component for displaying text content with customizable styles.
- **Expected Data Format**: `{ content: "HTML content or text" }`
- **Example**:
  ```html
  <text-block></text-block>
  <script>
    const textBlock = document.querySelector('text-block');
    textBlock.data = { content: '<p>Hello, world!</p>' };
  </script>
VideoBlock Component
Description: A component for displaying a video with customizable styles.
Expected Data Format: { src: "URL to video file" }

Example:
<video-block></video-block>
<script>
  const videoBlock = document.querySelector('video-block');
  videoBlock.data = { src: 'https://www.w3schools.com/html/mov_bbb.mp4' };
</script>
SwapBlock Component
Description: A component for displaying multiple pieces of content that can be swapped.
Expected Data Format: { items: [{ header: "Header", body: "Body content" }, ...] }

Example:
<swap-block></swap-block>
<script>
  const swapBlock = document.querySelector('swap-block');
  swapBlock.data = { items: [{ header: 'First', body: 'First body' }, { header: 'Second', body: 'Second body' }] };
</script>
CounterBlock Component
Description: A component that displays a counter with an increment button.
Expected Data Format: { count: initialCount }

Example:
<counter-block></counter-block>
<script>
  const counterBlock = document.querySelector('counter-block');
  counterBlock.data = { count: 0 };
</script>
McQuestion Component
Description: A component for displaying a multiple-choice question.
Expected Data Format: { question: "Question text", options: ["Option1", "Option2", ...], correctAnswer: index }

Example:
<mc-question></mc-question>
<script>
  const mcQuestion = document.querySelector('mc-question');
  mcQuestion.data = { question: 'What is 2+2?', options: ['3', '4', '5'], correctAnswer: 1 };
</script>
Developing New Components
To create a new component, you can use the template-block.js as a starting point. This template includes basic structure and style guidelines, and you can expand it to meet your specific requirements.