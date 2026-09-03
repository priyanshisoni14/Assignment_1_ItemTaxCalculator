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

/**
 * Contract that any persistence backend for students must satisfy.
 * StudentRepository only ever talks to this interface, so the actual
 * storage technology (append-only log file, SQLite, MongoDB-style JSON, etc.)
 * can be swapped without touching business logic anywhere else in the app.
 */
export interface StudentStore {
  loadAll(): Promise<Student[]>;
  appendAll(records: LogRecord[]): Promise<void>;
}