import { StudentDisplay } from "../../student/StudentDisplay";
import { Command } from "./Command";

export class DisplayStudentCommand implements Command {
  constructor(private readonly studentDisplay: StudentDisplay) {}

  public async execute(): Promise<boolean> {
    await this.studentDisplay.displayStudents();

    return true;
  }
}
