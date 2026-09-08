import { studentInputConfig } from "./StudentInputConfig";
import { AddStudentCommand } from "../../command/assignment2/AddStudentCommand";
import { Command } from "../../command/assignment2/Command";
import { CommandRegistry } from "../../command/assignment2/CommandRegistry";
import { DeleteStudentCommand } from "../../command/assignment2/DeleteStudentCommand";
import { DisplayStudentCommand } from "../../command/assignment2/DisplayStudentCommand";
import { ExitCommand } from "../../command/assignment2/ExitCommand";
import { SaveStudentCommand } from "../../command/assignment2/SaveStudentCommand";
import { StudentFactory } from "../../factory/assignment2/StudentFactory";
import { InputParser } from "../../parser/InputParser";
import { StudentJsonStore } from "../../persistence/assignment2/StudentJsonStore";
import { StudentDeletion } from "../../student/StudentDeletion";
import { StudentDisplay } from "../../student/StudentDisplay";
import { StudentInputCollector } from "../../student/StudentInputCollector";
import { StudentRegistration } from "../../student/StudentRegistration";
import { StudentRepository } from "../../student/StudentRepository";
import { StudentSorter } from "../../sorter/StudentSorter";
import { ConsoleUI } from "../../ui/ConsoleUI";
import { StudentInputMapper } from "../../utils/assignment2/StudentInputMapper";
import { SingleFieldValidator } from "../../utils/assignment2/SingleFieldValidator";

export class StudentApplicationConfig {
  public static create(): {
    commandRegistry: CommandRegistry;
    loadStudents: () => Promise<void>;
  } {
    const studentStore = new StudentJsonStore("students.db.json");

    const studentRepository = new StudentRepository(
      studentStore,
      new StudentSorter(),
    );

    const studentInputMapper = new StudentInputMapper();

    const singleFieldValidator = new SingleFieldValidator(studentInputConfig);

    const studentRegistration = new StudentRegistration(
      new StudentInputCollector(singleFieldValidator),
      new InputParser(studentInputConfig),
      new StudentFactory(),
      studentRepository,
      studentInputMapper,
    );

    const studentDisplay = new StudentDisplay(
      studentRepository,
      new StudentSorter(),
    );

    const studentDeletion = new StudentDeletion(
      studentRepository,
      singleFieldValidator,
    );

    const commandRegistry = new CommandRegistry(
      new Map<string, Command>([
        ["1", new AddStudentCommand(studentRegistration)],
        ["2", new DisplayStudentCommand(studentDisplay)],
        ["3", new DeleteStudentCommand(studentDeletion)],
        ["4", new SaveStudentCommand(studentRepository)],
        ["5", new ExitCommand(studentRepository)],
      ]),
    );

    const loadStudents = async (): Promise<void> => {
      try {
        await studentRepository.load();
      } catch (error) {
        ConsoleUI.displayCaughtError(error, "Unable to load user details.");
      }
    };

    return {
      commandRegistry,
      loadStudents,
    };
  }
}