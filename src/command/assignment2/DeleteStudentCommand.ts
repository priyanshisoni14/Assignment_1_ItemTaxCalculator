import { StudentDeletion } from "../../student/StudentDeletion";
import { Command } from "./Command";

export class DeleteStudentCommand implements Command {
  constructor(private readonly studentDeletion: StudentDeletion) {}

  public async execute(): Promise<boolean> {
    await this.studentDeletion.deleteStudent();

    return true;
  }
}
