import {studentInputConfig} from "../../config/assignment2/StudentInputConfig";
import {StudentFactory} from "../../factory/assignment2/StudentFactory";
import {InputParser} from "../../parser/InputParser";
import {StudentInputCollector} from "../../student/StudentInputCollector";
import {StudentManager} from "../../student/StudentManager";
import {StudentRegistration} from "../../student/StudentRegistration";
import {StudentDisplay} from "../../student/StudentDisplay";
import {StudentDeletion} from "../../student/StudentDeletion";
import {StudentSerializer} from "../../student/StudentSerializer";
import {StudentSorter} from "../../sorter/StudentSorter";
import {ConsoleUI} from "../../ui/ConsoleUI";

import {Command} from "../../command/assignment2/Command";
import {CommandRegistry} from "../../command/assignment2/CommandRegistry";
import {AddStudentCommand} from "../../command/assignment2/AddStudentCommand";
import {DisplayStudentCommand} from "../../command/assignment2/DisplayStudentCommand";
import {DeleteStudentCommand} from "../../command/assignment2/DeleteStudentCommand";
import {SaveStudentCommand} from "../../command/assignment2/SaveStudentCommand";
import {ExitCommand} from "../../command/assignment2/ExitCommand";

export class StudentApplication {

    private static instance: StudentApplication;

    private readonly ui: ConsoleUI;
    private readonly studentManager: StudentManager;
    private readonly studentRegistration: StudentRegistration;
    private readonly studentDisplay: StudentDisplay;
    private readonly studentDeletion: StudentDeletion;
    private readonly studentSerializer: StudentSerializer;
    private readonly commandRegistry: CommandRegistry;

    private constructor() {

        this.ui = new ConsoleUI();

        this.studentManager = new StudentManager();

        this.studentRegistration =
            new StudentRegistration(
                new StudentInputCollector(this.ui),
                new InputParser(studentInputConfig),
                new StudentFactory(),
                this.studentManager
            );

        this.studentDisplay =
            new StudentDisplay(
                this.studentManager,
                new StudentSorter(),
                this.ui
            );

        this.studentDeletion =
            new StudentDeletion(
                this.studentManager,
                this.ui
            );

        this.studentSerializer =
            new StudentSerializer(
                "students.json"
            );

        this.commandRegistry =
            new CommandRegistry(
                new Map<string, Command>([
                    [
                        "1",
                        new AddStudentCommand(
                            this.studentRegistration,
                            this.ui
                        )
                    ],
                    [
                        "2",
                        new DisplayStudentCommand(
                            this.studentDisplay
                        )
                    ],
                    [
                        "3",
                        new DeleteStudentCommand(
                            this.studentDeletion
                        )
                    ],
                    [
                        "4",
                        new SaveStudentCommand(
                            this.studentManager,
                            this.studentSerializer,
                            this.ui
                        )
                    ],
                    [
                        "5",
                        new ExitCommand(
                            this.studentManager,
                            this.studentSerializer,
                            this.ui
                        )
                    ]
                ])
            );
    }

    public static getInstance(): StudentApplication {

        if (StudentApplication.instance === undefined) {
            StudentApplication.instance =
                new StudentApplication();
        }

        return StudentApplication.instance;
    }

    public async run(): Promise<void> {

        await this.loadStudents();

        let isRunning = true;

        while (isRunning) {

            this.displayMenu();

            const selectedOption =
                await this.getMenuOption();

            const command =
                this.commandRegistry.getCommand(
                    selectedOption
                );

            if (command === undefined) {
                this.ui.displayMessage(
                    "Invalid option. Please select an option from 1 to 5."
                );
                continue;
            }

            isRunning =
                await command.execute();
        }

        this.ui.close();
    }

    private displayMenu(): void {

        this.ui.displayMessage(
            [
                "\nStudent Management System",
                "1. Add User details",
                "2. Display User details",
                "3. Delete User details",
                "4. Save User details",
                "5. Exit"
            ].join("\n")
        );
    }

    private async getMenuOption(): Promise<string> {

        return (
            await this.ui.askQuestion(
                "\nSelect an option: "
            )
        ).trim();
    }

    private async loadStudents(): Promise<void> {

        try {

            const students =
                await this.studentSerializer.load();

            this.studentManager.setStudents(
                students
            );

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to load user details.";

            this.ui.displayError(message);
        }
    }
}