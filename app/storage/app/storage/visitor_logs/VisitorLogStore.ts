import { addVisitorLog } from "../../../app/storage/app/storage/visitor_logs/VisitorLogStore";
export type VisitorLogInput = {
  name: string;
  company?: string;
  purpose: string;
};

export type VisitorLog = {
  id: string;
  name: string;
  company: string;
  purpose: string;
  timestamp: string;
  status: "LOCAL_ONLY" | "QUEUED_FOR_SYNC";
};

const visitorLogs: VisitorLog[] = [];

export function addVisitorLog(input: VisitorLogInput): VisitorLog {
  const visitor: VisitorLog = {
    id: `visitor_${Date.now()}`,
    name: input.name,
    company: input.company || "N/A",
    purpose: input.purpose,
    timestamp: new Date().toISOString(),
    status: "QUEUED_FOR_SYNC"
  };

  visitorLogs.push(visitor);
  return visitor;
}

export function getVisitorLogs(): VisitorLog[] {
  return visitorLogs;
}

export function clearVisitorLogs(): void {
  visitorLogs.length = 0;
}