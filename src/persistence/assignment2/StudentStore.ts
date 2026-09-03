import { Student } from "../../models/assignment2/Student";

export type InsertLogRecord = {
  op: "insert";
  student: Student;
};

export type DeleteLogRecord = {
  op: "delete";
  id: string;
};

export type LogRecord = InsertLogRecord | DeleteLogRecord;


export interface StudentStore {
  loadAll(): Promise<Student[]>;
  appendAll(records: LogRecord[]): Promise<void>;
}