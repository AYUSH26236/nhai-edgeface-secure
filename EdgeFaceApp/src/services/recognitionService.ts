export interface RecognitionResult {

 embedding:number[];

 confidence:number;

 matched:boolean;

 workerId:string;

}

export class RecognitionService {

 async recognize(
  image:string
 ):Promise<RecognitionResult>{

  return {

   embedding:[],

   confidence:0,

   matched:false,

   workerId:""

  };

 }

}
