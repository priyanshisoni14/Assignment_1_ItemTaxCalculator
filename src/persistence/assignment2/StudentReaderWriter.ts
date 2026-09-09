import { readFile, rename, writeFile } from "fs/promises";
import { Student } from "../../models/assignment2/Student";
import { StudentRecord } from "../../models/assignment2/StudentRecord";
import { ConsoleUI } from "../../ui/ConsoleUI";

export interface StudentReaderWriter {
  load(): Promise<Student[]>;
  save(students: Student[]): Promise<void>;
}

export class StudentFileReaderWriter implements StudentReaderWriter {
  constructor(private readonly filePath: string) {}

  public async load(): Promise<Student[]> {
    try {
      const raw = await readFile(this.filePath, "utf-8");

      const records = JSON.parse(raw) as StudentRecord[];

      return records.map((record) => Student.fromRecord(record));
    } catch (error) {
      if (this.isFileNotFoundError(error)) {
        return [];
      }

      await this.recoverFromCorruptedFile(error);

      return [];
    }
  }

  public async save(students: Student[]): Promise<void> {
    await writeFile(this.filePath, JSON.stringify(students, null, 2), "utf-8");
  }

  private isFileNotFoundError(error: unknown): boolean {
    return (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    );
  }

  private async recoverFromCorruptedFile(error: unknown): Promise<void> {
    const backupPath = `${this.filePath}.corrupted-${Date.now()}.bak`;

    try {
      await rename(this.filePath, backupPath);

      ConsoleUI.displayCaughtError(
        "StudentFileReaderWriter.load",
        error,
        `${this.filePath} could not be read. Backed up to ${backupPath}; starting with an empty student list.`,
      );
    } catch (renameError) {
      ConsoleUI.displayCaughtError(
        "StudentFileReaderWriter.recoverFromCorruptedFile",
        renameError,
        `${this.filePath} could not be read and could not be backed up. Starting with an empty student list.`,
      );
    }
  }
}