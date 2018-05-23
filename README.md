# p5-accessibility.js

## Overview
p5-accessibility.js makes the p5 canvas more accessible to people who are blind and visually impaired.

The canvas is an inherently inaccessible element in the web. This library tries to reconstruct the content of the p5 canvas in words and sounds accessible to screen readers.

The library creates 3 outputs:

1) **Plain Text Output** - Describes the visual content present in the canvas in list form. Each element can be selected to get more details.

2) **Table Text Output** - The visual content in the canvas is laid out in the form of a table based on the spatial location of each element- the elements can be selected individually to get more details.

3) **Sound Output** - This mode explains the movement of the objects present in the canvas. Top to Down movement is represented by a decrease in frequency and left to right through panning.

To learn more about the project read this [article](https://medium.com/processing-foundation/p5-accessibility-115d84535fa8).

If you have found a bug in the p5-accessibility.js library, you can file it here under the [“issues”](https://github.com/processing/p5.accessibility/issues) tab. 

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
```
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
* You can read more about the [code structure here](https://github.com/processing/p5.accessibility/blob/master/CodeStructure.md).
* https://guides.github.com/activities/hello-world/
* https://guides.github.com/activities/forking/

### Development installation

* Clone or download this repo
* `cd` into the repo
* run `npm install` 
* run `grunt curl` to get the latest versions of the CDN libraries
* make changes to the source code in the `src` folder
* run `grunt` in the root folder, this will update the library in `/dist/p5-accessibility.js`
* keep in mind that the examples here reference the latest CDN link to the library and not the `/dist/p5-accessibility.js` that you might generate. If you want to test your changes with the existing examples, change the index.html files in the examples to point to your local `/dist/p5-accessibility.js`

## Tools
We use the following tools:
* [grunt-curl](https://github.com/twolfson/grunt-curl) a low-tech dependency manager.
* [ColorNamer.js](https://github.com/MathuraMG/color-namer) a simple npm module/js client library that gives back an accessible color-name of a hex or rgb value.
