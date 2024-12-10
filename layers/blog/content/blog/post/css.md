---
draft: true
date: '2024-08-11'
author: Javier Iglesias Garcia
image: https://picsum.photos/seed/css/500/300
tags: ['css', 'web']
---

# CSS: Mastering the Art of Styling the Web

Cascading Style Sheets (CSS) is the language used to control the presentation of web pages. From layout to typography to color schemes, CSS is what makes the web visually appealing. This article delves into the core concepts of CSS, modern layout techniques, and practical examples.

## The Basics of CSS

CSS is used to style HTML elements. Here's a simple example:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Example</title>
    <style>
      body {
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #333;
      }
      p {
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph styled with CSS.</p>
  </body>
</html>
```

In this example, we set the font, background color, and text color using CSS.

## Modern Layout Techniques

### Flexbox

Flexbox is a layout model that allows you to create responsive designs with ease. Here's a basic example:

```html
<div style="display: flex;">
  <div style="flex: 1; background-color: lightcoral;">Item 1</div>
  <div style="flex: 2; background-color: lightblue;">Item 2</div>
  <div style="flex: 1; background-color: lightgreen;">Item 3</div>
</div>
```

In this example, `flex: 1` and `flex: 2` determine how much space each item takes up in the flex container.

### CSS Grid

CSS Grid is another powerful layout system that is particularly well-suited for creating complex two-dimensional layouts:

```html
<div style="display: grid; grid-template-columns: 1fr 2fr;">
  <div style="background-color: lightcoral;">Item 1</div>
  <div style="background-color: lightblue;">Item 2</div>
  <div style="background-color: lightgreen;">Item 3</div>
</div>
```

This example creates a grid with two columns: the first column takes up 1 fraction of the space, and the second takes up 2 fractions.

## Responsive Design

Responsive design ensures that your web pages look good on all devices. Media queries are a key tool in this process:

```css
@media (max-width: 600px) {
  body {
    background-color: lightyellow;
  }
}
```

This CSS rule changes the background color to yellow when the screen width is 600px or less.

## Conclusion

CSS is a foundational technology for web development, enabling the creation of visually appealing and responsive designs. Mastery of CSS, along with modern techniques like Flexbox and Grid, is essential for any web developer.
