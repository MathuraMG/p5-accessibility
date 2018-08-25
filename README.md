[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)

# p5.accessibility.js

## Overview

p5.accessibility.js makes the p5 canvas more accessible to people who are blind and visually impaired.

To learn about using p5.js with a screen reader please read the ["Using p5 with a screen reader" tutorial.](https://p5js.org/learn/p5-screen-reader.html)

**\*Note** : the p5.accessibility library is currently not supported on MacOS. \*

### About the library

The canvas is an inherently inaccessible element in the web. This library tries to reconstruct the content of the p5 canvas in words and sounds accessible to screen readers.

The library creates 3 outputs:

1.  **Plain Text Output** - This output describes the visual content present on the canvas.

    The general description of the canvas includes canvas size, canvas color, and number of elements in the canvas (example: "Your output is a 200 by 200 lavender blue (123, 87, 255) canvas containing the following 4 objects:""). This description is followed by a list of elements where the shape, color, position, and area of each element are described (example: "orange (255, 128, 0) ellipse at top left covering 0.79% of the canvas"), each element can be selected to get more details. A table of elements is also provided. In this table, shape, color, location, coordinates and area are described (example: "orange (255, 128, 0) ellipse location=top left coordinates =20x,20y area=0.79%").

2.  **Table Text Output** - The table output laids out the content of the canvas in the form of a table based on the spatial location of each element.

    A brief description of the canvas is available before the table output. This description includes: color of the background, size of the canvas, number of objects, and object types (example: "lavender blue (123, 87, 255) canvas is 200 by 200 of area 40000 contains 4 objects - 3 ellipse 1 rect"). The table describes the content spatially, each element is placed on a cell of the table depending on its position. Within each cell an element the color and type of shape of that element are available (example: "orange (255, 87, 255) ellipse"). These descriptions can be selected individually to get more details. A list of elements where shape, color, location, coordinates and area are described (example: "orange (255, 128, 0) ellipse location=top left coordinates =20x,20y area=0.79%") is also available.

3.  **Sound Output** - This mode explains the movement of the objects present in the canvas. Top to Down movement is represented by a decrease in frequency and left to right through panning.

To learn more about the project please read the following Medium articles: [P5 accessibility](https://medium.com/processing-foundation/accessibility-115d84535fa8) and [Making p5.js Accessible](https://medium.com/processing-foundation/making-p5-js-accessible-e2ce366e05a0).

If you have found a bug in the p5.accessibility.js library, you can file it here under the [“issues”](https://github.com/processing/p5.accessibility/issues) tab.

## Usage

Link to the library at the end of your html file:
`<script src="https://cdn.rawgit.com/processing/p5.accessibility/v0.1.1/dist/p5-accessibility.js"></script>`

To get the **plain text output**, include the following in your HTML file, and place it where you want the output to be available:
`<section id="textOutput-content"></section>`

To get the **table text output**, include the following in your HTML file, and place it where you want the output to be available:
`<section id="tableOutput-content"></section>`

To get the **sound output**, include the following in your HTML file, and place it where you want the output to be available:
`<section id="soundOutput-content"></section>`

To make the **plain text and table text outputs** visible include the following in your HTML file:

```html
<style>
      #textOutput-content, #tableOutput-content{
        position: static !important;
        left: 10px !important;
        top: auto !important;
        width: auto !important;
        height: auto !important;
        overflow: visible !important;
      }
 </style>
```

## Get Involved

p5.js and p5.accessibility.js are collaborative projects created by many individuals, and you are invited to help. All types of involvement are welcome. See the [community section](https://p5js.org/community/) to get started!

### How Can I Contribute?

#### First Timers

For first-time contributors or those who want to start with a small task: check out our list of [good first bugs](https://github.com/processing/p5.accessibility/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22). First read the github discussion on that issue and find out if there's currently a person working on that or not. If no one is working on it or if there has was one claimed to but has not been active for a while, ask if it is up for grabs. It's okay to not know how to fix an issue and feel free to ask questions about to approach the problem! We are all just here to learn and make something awesome. Someone from the community would help you out and these are great issues for learning about the library and its development process.

#### Want something more challenging?

If you're already familiar with the project or would like take on something a little more challenging, please take a look at the [priority: high](https://github.com/processing/p5.accessibility/issues?q=is%3Aopen+is%3Aissue+label%3A%22priority%3A+high%22) issues.

#### Feature Enhancement

If you want to work on building new things, please take a look at [type: feature](https://github.com/processing/p5.accessibility/issues?q=is%3Aopen+is%3Aissue+label%3A%22type%3A+feature%22).

If you'd like to work on a bug, please comment on it to let the maintainers know. If someone else has already commented and taken up that bug, please refrain from working on it and submitting a PR without asking the maintainers as it leads to unnecessary duplication of effort.

##### Contribution guides

- You can read more about the [code structure here](https://github.com/processing/p5.accessibility/blob/master/CodeStructure.md).
- https://guides.github.com/activities/hello-world/
- https://guides.github.com/activities/forking/

### Development installation

- Clone or download this repo
- `cd` into the repo
- run `npm install`
- run `grunt curl` to get the latest versions of the CDN libraries
- make changes to the source code in the `src` folder
- run `grunt` in the root folder, this will update the library in `/dist/p5.accessibility.js`
- keep in mind that the examples here reference the latest CDN link to the library and not the `/dist/p5.accessibility.js` that you might generate. If you want to test your changes with the existing examples, change the index.html files in the examples to point to your local `/dist/p5.accessibility.js`

## Tools

We use the following tools:

- [grunt-curl](https://github.com/twolfson/grunt-curl) a low-tech dependency manager.
- [ColorNamer.js](https://github.com/MathuraMG/color-namer) a simple npm module/js client library that gives back an accessible color-name of a hex or rgb value.
