import {studentInputConfig} from "../../config/assignment2/StudentInputConfig";
import {AddStudentCommand} from "../../command/assignment2/AddStudentCommand";
import {Command} from "../../command/assignment2/Command";
import {CommandRegistry} from "../../command/assignment2/CommandRegistry";
import {DeleteStudentCommand} from "../../command/assignment2/DeleteStudentCommand";
import {DisplayStudentCommand} from "../../command/assignment2/DisplayStudentCommand";
import {ExitCommand} from "../../command/assignment2/ExitCommand";
import {SaveStudentCommand} from "../../command/assignment2/SaveStudentCommand";
import {StudentFactory} from "./StudentFactory";
import {InputParser} from "../../parser/InputParser";
import {StudentDeletion} from "../../student/StudentDeletion";
import {StudentDisplay} from "../../student/StudentDisplay";
import {StudentInputCollector} from "../../student/StudentInputCollector";
import {StudentManager} from "../../student/StudentManager";
import {StudentRegistration} from "../../student/StudentRegistration";
import {StudentSerializer} from "../../student/StudentSerializer";
import {StudentSorter} from "../../sorter/StudentSorter";
import {ConsoleUI} from "../../ui/ConsoleUI";
import {StudentInputMapper} from "../../utils/assignment2/StudentInputMapper";

export class StudentApplicationFactory {

    public static create(ui: ConsoleUI): {
        commandRegistry: CommandRegistry;
        loadStudents: () => Promise<void>;
    } {
        const studentManager =
            new StudentManager();

        const studentSerializer =
            new StudentSerializer("students.json");

        const studentInputMapper =
            new StudentInputMapper();

        const studentRegistration =
            new StudentRegistration(
                new StudentInputCollector(ui),
                new InputParser(studentInputConfig),
                new StudentFactory(),
                studentManager,
                studentInputMapper
            );

        const studentDisplay =
            new StudentDisplay(
                studentManager,
                new StudentSorter(),
                ui
            );

        const studentDeletion =
            new StudentDeletion(
                studentManager,
                ui
            );

        const commandRegistry =
            new CommandRegistry(
                new Map<string, Command>([
                    [
                        "1",
                        new AddStudentCommand(
                            studentRegistration,
                            ui
                        )
                    ],
                    [
                        "2",
                        new DisplayStudentCommand(
                            studentDisplay
                        )
                    ],
                    [
                        "3",
                        new DeleteStudentCommand(
                            studentDeletion
                        )
                    ],
                    [
                        "4",
                        new SaveStudentCommand(
                            studentManager,
                            studentSerializer,
                            ui
                        )
                    ],
                    [
                        "5",
                        new ExitCommand(
                            studentManager,
                            studentSerializer,
                            ui
                        )
                    ]
                ])
            );

        const loadStudents =
            async (): Promise<void> => {
                try {
                    const students =
                        await studentSerializer.load();

                    studentManager.setStudents(
                        students
                    );
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
            loadStudents
        };
    }
}