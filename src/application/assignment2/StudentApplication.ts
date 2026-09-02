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

export class StudentApplication {

    private static instance: StudentApplication;

    private readonly ui: ConsoleUI;
    private readonly studentManager: StudentManager;
    private readonly studentRegistration: StudentRegistration;
    private readonly studentDisplay: StudentDisplay;
    private readonly studentDeletion: StudentDeletion;
    private readonly studentSerializer: StudentSerializer;

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

            switch (selectedOption) {

                case "1":
                    await this.registerStudent();
                    break;

                case "2":
                    await this.studentDisplay.displayStudents();
                    break;

                case "3":
                    await this.studentDeletion.deleteStudent();
                    break;

                case "4":
                    await this.saveStudents();
                    break;

                case "5":
                    isRunning =
                        !(await this.confirmExit());
                    break;

                default:
                    this.ui.displayMessage(
                        "Invalid option. Please select an option from 1 to 5."
                    );
            }
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

    private async registerStudent(): Promise<void> {

        try {

            await this.studentRegistration.registerStudent();

            this.ui.displayMessage(
                "Student added successfully."
            );

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred.";

            this.ui.displayError(message);
        }
    }

    private async saveStudents(): Promise<void> {

        try {

            await this.studentSerializer.save(
                this.studentManager.getStudents()
            );

            this.ui.displayMessage(
                "User details saved successfully."
            );

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to save user details.";

            this.ui.displayError(message);
        }
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

    private async confirmExit(): Promise<boolean> {

        const saveChanges =
            await this.ui.askQuestion(
                "\nDo you want to save latest changes? (y/n): "
            );

        if (
            saveChanges.trim().toLowerCase() !== "y"
        ) {
            return true;
        }

        try {

            await this.studentSerializer.save(
                this.studentManager.getStudents()
            );

            this.ui.displayMessage(
                "User details saved successfully."
            );

            return true;

        } catch (error) {

            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to save user details.";

            this.ui.displayError(message);

            return false;
        }
    }
}