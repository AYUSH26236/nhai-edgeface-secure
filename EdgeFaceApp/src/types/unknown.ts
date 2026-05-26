export type UnknownMode =

 | "REJECT"

 | "TEMP"

 | "VISITOR"

 | "IMPORT";

export interface UnknownDecision {

 mode: UnknownMode;

 approvalRequired:boolean;

 operatorId:string;

 reason:string;

}
