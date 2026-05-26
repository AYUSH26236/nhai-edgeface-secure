export interface EmbeddingResult {

 embedding:number[];

 dimension:number;

 generated:boolean;

}

export class EmbeddingGenerator {

 async generate(
  image:string
 ):Promise<EmbeddingResult>{

  return {

   embedding:[],

   dimension:128,

   generated:false

  };

 }

}
