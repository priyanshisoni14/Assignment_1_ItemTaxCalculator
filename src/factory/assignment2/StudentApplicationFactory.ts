import { studentInputConfig } from "../../config/assignment2/StudentInputConfig";
import { AddStudentCommand } from "../../command/assignment2/AddStudentCommand";
import { Command } from "../../command/assignment2/Command";
import { CommandRegistry } from "../../command/assignment2/CommandRegistry";
import { DeleteStudentCommand } from "../../command/assignment2/DeleteStudentCommand";
import { DisplayStudentCommand } from "../../command/assignment2/DisplayStudentCommand";
import { ExitCommand } from "../../command/assignment2/ExitCommand";
import { SaveStudentCommand } from "../../command/assignment2/SaveStudentCommand";
import { StudentFactory } from "./StudentFactory";
import { InputParser } from "../../parser/InputParser";
import { StudentMongoJsonStore } from "../../persistence/assignment2/StudentMongoJsonStore";
import { StudentDeletion } from "../../student/StudentDeletion";
import { StudentDisplay } from "../../student/StudentDisplay";
import { StudentInputCollector } from "../../student/StudentInputCollector";
import { StudentRegistration } from "../../student/StudentRegistration";
import { StudentRepository } from "../../student/StudentRepository";
import { StudentSorter } from "../../sorter/StudentSorter";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { StudentInputMapper } from "../../utils/assignment2/StudentInputMapper";

export class StudentApplicationFactory {
  public static create(ui: ConsoleUI): {
    commandRegistry: CommandRegistry;
    loadStudents: () => Promise<void>;
  } {
    const studentStore = new StudentMongoJsonStore("students.db.json");

    const studentRepository = new StudentRepository(
      studentStore,
      new StudentSorter(),
    );

    const studentInputMapper = new StudentInputMapper();

    const studentRegistration = new StudentRegistration(
      new StudentInputCollector(ui),
      new InputParser(studentInputConfig),
      new StudentFactory(),
      studentRepository,
      studentInputMapper,
    );

    const studentDisplay = new StudentDisplay(
      studentRepository,
      new StudentSorter(),
      ui,
    );

    const studentDeletion = new StudentDeletion(studentRepository, ui);

    const commandRegistry = new CommandRegistry(
      new Map<string, Command>([
        ["1", new AddStudentCommand(studentRegistration, ui)],
        ["2", new DisplayStudentCommand(studentDisplay)],
        ["3", new DeleteStudentCommand(studentDeletion)],
        ["4", new SaveStudentCommand(studentRepository, ui)],
        ["5", new ExitCommand(studentRepository, ui)],
      ]),
    );

    const loadStudents = async (): Promise<void> => {
      try {
        await studentRepository.load();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load user details.";

        ui.displayError(message);
      }
    };

    return {
      commandRegistry,
      loadStudents,
    };
  }
}