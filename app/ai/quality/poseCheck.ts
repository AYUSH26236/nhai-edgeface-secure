export interface PoseResult {

 posePass:boolean;

 yaw:number;

 pitch:number;

 roll:number;

}

export class PoseDetector {

 async check(
  image:string
 ):Promise<PoseResult>{

  return {

   posePass:true,

   yaw:0,

   pitch:0,

   roll:0

  };

 }

}
