import {
 QualityResult
}
from "../types/quality";

export class QualityService {

 async checkQuality(
  image:string
 ):Promise<QualityResult>{

  return {

   blurPass:true,

   lightingPass:true,

   occlusionPass:true,

   posePass:true,

   faceSizePass:true,

   blurScore:1,

   lightingScore:1,

   occlusionScore:1,

   poseScore:1

  };

 }

}
