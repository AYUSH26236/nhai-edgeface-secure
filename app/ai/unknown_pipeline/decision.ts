export interface FinalDecision {

 approved:boolean;

 method:

 | "PARTIAL"

 | "FULL_VECTOR"

 | "REJECT";

 confidence:number;

}
