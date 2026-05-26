import {
 BlazeFaceDetector
}
from
"../../app/ai/detection/blazeface/detector.ts";

async function run(){

 const detector=
 new BlazeFaceDetector();

 await detector.loadModel();
console.log(
"Detector test placeholder"
);

}

run();