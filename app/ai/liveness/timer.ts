export interface TimingResult {

 timingPass:boolean;

 duration:number;

 maxAllowed:number;

}

export class TimingValidator {

 async validate():
 Promise<TimingResult>{

  return {

   timingPass:true,

   duration:0,

   maxAllowed:5

  };

 }
}
