import {
 BlazeFaceDetector
}
from
"../../app/ai/detection/blazeface/detector";

async function run(){

 const detector=
 new BlazeFaceDetector();

 await detector.loadModel();

 console.log(
 "BlazeFace loaded"
 );

}

run();