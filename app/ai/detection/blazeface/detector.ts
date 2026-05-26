export interface DetectionResult {

    faceFound:boolean;

    faceCount:number;

    confidence:number;

    x:number;

    y:number;

    width:number;

    height:number;

}

export class BlazeFaceDetector {

    private modelLoaded=false;

    async loadModel():
    Promise<boolean>{

        console.log(
            "Loading BlazeFace..."
        );

        this.modelLoaded=true;

        return this.modelLoaded;

    }

    async detect(
        image:string
    ):Promise<DetectionResult>{

        if(
            !this.modelLoaded
        ){

            await this.loadModel();

        }

        console.log(
            "Running face detection"
        );

        return{

            faceFound:false,

            faceCount:0,

            confidence:0,

            x:0,

            y:0,

            width:0,

            height:0

        };

    }

}