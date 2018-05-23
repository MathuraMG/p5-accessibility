const baseFreq = 440;
let currLogFreq, currVol, currPan;

// initialise parameters
let movingObjectCount = 0;
let currFrame = 2;
const movingObjects = [];
/* global funcNames */
/* global allData */
funcNames = allData.classitems.map((x) => {
    if (x.overloads) {
        /* global tempParam */
        tempParam = x.overloads[0].params;
    } else {
        tempParam = x.params;
    }
    return {
        name: x.name,
        params: tempParam,
        class: x[`class`],
        module: x.module,
        submodule: x.submodule
    };
});

// create web audio api context
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillatorNodes = [];
const gainNodes = [];
const panNodes = [];

funcNames = funcNames.filter((x) => {
    const className = x[`class`];
    return (x.name && x.params && (className === `p5`));
});

if (document.getElementById(`soundOutput-content`)) {
    funcNames.forEach((x) => {
        let i = 0;
        /* global p5 */
        const originalFunc = p5.prototype[x.name];
        p5.prototype[x.name] = function() {
            /* global orgArg */
            orgArg = arguments;

            if (frameCount === 1 && (x.module.localeCompare(`Shape`) === 0)) {
                i = 0;
                x.params.forEach((param) => {
                    if (param.description.indexOf(`x-coordinate`) > -1) {
                        /* global xPosPrev */
                        xPosPrev = orgArg[i];
                        /* global xPosCurr */
                        xPosCurr = orgArg[i];
                    }
                    if (param.description.indexOf(`y-coordinate`) > -1) {
                        /* global yPosPrev */
                        yPosPrev = orgArg[i];
                        /* global yPosCurr */
                        yPosCurr = orgArg[i];
                    }
                    i++;
                });
            } else if (frameCount > 1 && (frameCount % 1 === 0) && (x.module.localeCompare(`Shape`) === 0)) {

                // Pull out only the shapes in draw()
                if (frameCount !== currFrame) {
                    currFrame++;
                    movingObjectCount = 0;
                }
                movingObjectCount++;

                if (!oscillatorNodes[movingObjectCount - 1]) {
                    const index = movingObjectCount - 1;
                    oscillatorNodes[index] = audioCtx.createOscillator();
                    gainNodes[index] = audioCtx.createGain();
                    panNodes[index] = audioCtx.createStereoPanner();
                    oscillatorNodes[index].type = `sine`;
                    oscillatorNodes[index].frequency.value = baseFreq; // value in hertz
                    oscillatorNodes[index].start();
                    oscillatorNodes[index].connect(gainNodes[index]);
                    gainNodes[index].connect(panNodes[index]);
                    panNodes[index].connect(audioCtx.destination);
                    gainNodes[index].gain.value = 0.1;
                }

                if (!movingObjects[movingObjectCount - 1]) {
                    movingObjects[movingObjectCount - 1] = new Object({
                        xPosCurr: 0,
                        xPosDiff: 0,
                        xPosPrev: 0,
                        yPosCurr: 0,
                        yPosDiff: 0,
                        yPosPrev: 0
                    });
                }
                // pull out only the x coord values and compare with prev value
                i = 0;
                x.params.some((param) => {
                    if (param.description.indexOf(`y-coordinate`) > -1) {
                        movingObjects[movingObjectCount - 1].yPosCurr = orgArg[i];
                        movingObjects[movingObjectCount - 1].yPosDiff = movingObjects[movingObjectCount - 1].yPosCurr - movingObjects[movingObjectCount - 1].yPosPrev;
                        movingObjects[movingObjectCount - 1].yPosPrev = movingObjects[movingObjectCount - 1].yPosCurr;
                        return true;
                    }
                    i++;
                });
                i = 0;
                x.params.some((param) => {
                    if (param.description.indexOf(`x-coordinate`) > -1) {
                        movingObjects[movingObjectCount - 1].xPosCurr = orgArg[i];
                        movingObjects[movingObjectCount - 1].xPosDiff = movingObjects[movingObjectCount - 1].xPosCurr - movingObjects[movingObjectCount - 1].xPosPrev;
                        movingObjects[movingObjectCount - 1].xPosPrev = movingObjects[movingObjectCount - 1].xPosCurr;
                        return true;
                    }
                    i++;
                });

                if (abs(movingObjects[movingObjectCount - 1].xPosDiff) > 0 || abs(movingObjects[movingObjectCount - 1].yPosDiff) > 0) {
                    /* global currNote */
                    currNote = (1 - movingObjects[movingObjectCount - 1].yPosCurr / height) * (12); // mapping hieghts to notes from 1-100
                    // fn = f0 * (a)n
                    currLogFreq = baseFreq * Math.pow(Math.pow(2, (1 / 12)), currNote);
                    currVol = 0.4;
                    /* global xCoord */
                    xCoord = frameCount % 16 - 8;
                    currVol = 2 * movingObjectCount * Math.exp(-((xCoord + 2 * movingObjectCount) * (xCoord + 2 * movingObjectCount)));
                    currPan = (movingObjects[movingObjectCount - 1].xPosCurr / width) * 2 - 1;
                    oscillatorNodes[movingObjectCount - 1].frequency.value = currLogFreq;
                    gainNodes[movingObjectCount - 1].gain.value = currVol;
                    panNodes[movingObjectCount - 1].pan.value = currPan;
                } else {
                    gainNodes[movingObjectCount - 1].gain.value = 0;
                }
            }
            return originalFunc.apply(this, arguments);
        };
    });
}