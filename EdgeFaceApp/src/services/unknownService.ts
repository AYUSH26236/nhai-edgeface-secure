import {
 UnknownDecision
}
from "../types/unknown";

export class UnknownService {

 async decide():
 Promise<UnknownDecision>{

  return {

   mode:"REJECT",

   approvalRequired:false,

   operatorId:"",

   reason:""

  };

 }

}
