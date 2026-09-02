import { Student }
    from "../models/assignment2/Student";

import { StudentSortField }
    from "../models/assignment2/StudentSortField";

import { SortOrder }
    from "../models/assignment2/SortOrder";

import { StudentSorter }
    from "../sorter/StudentSorter";

import { ConsoleUI }
    from "../ui/ConsoleUI";

import { StudentManager }
    from "./StudentManager";


export class StudentDisplay {

    constructor(
        private readonly studentManager:
            StudentManager,

        private readonly studentSorter:
            StudentSorter,

        private readonly ui:
            ConsoleUI
    ) {}


    public async displayStudents():
        Promise<void> {

        const students =
            this.studentManager.getStudents();

        if (
            students.length === 0
        ) {

            this.ui.displayMessage(
                "No student details available."
            );

            return;
        }

        const shouldSort =
            await this.ui.askQuestion(
                "\nDo you want to sort the results? (y/n): "
            );

        if (
            shouldSort.trim().toLowerCase() === "y"
        ) {

            const field =
                await this.getSortField();

            const order =
                await this.getSortOrder();

            const sortedStudents =
                this.studentSorter.sortBy(
                    students,
                    field,
                    order
                );

            this.displayStudentTable(
                sortedStudents
            );

            return;
        }

        this.displayStudentTable(
            students
        );
    }


    private async getSortField():
        Promise<StudentSortField> {

        while (true) {

            const field =
                (
                    await this.ui.askQuestion(
                        [
                            "\nSort by:",
                            "1. Name",
                            "2. Roll Number",
                            "3. Age",
                            "4. Address",
                            "\nSelect an option: "
                        ].join("\n")
                    )
                ).trim();

            switch (field) {

                case "1":

                    return "fullName";

                case "2":

                    return "rollNumber";

                case "3":

                    return "age";

                case "4":

                    return "address";

                default:

                    this.ui.displayMessage(
                        "Invalid option. Please select 1, 2, 3, or 4."
                    );
            }
        }
    }


    private async getSortOrder():
        Promise<SortOrder> {

        while (true) {

            const order =
                (
                    await this.ui.askQuestion(
                        "\nSort order (1. Ascending, 2. Descending): "
                    )
                ).trim();

            switch (order) {

                case "1":

                    return "ascending";

                case "2":

                    return "descending";

                default:

                    this.ui.displayMessage(
                        "Invalid option. Please select 1 or 2."
                    );
            }
        }
    }


    private displayStudentTable(
        students: Student[]
    ): void {

        this.ui.displayTable(
            students.map(
                student => ({
                    Name:
                        student.fullName,

                    "Roll Number":
                        student.rollNumber,

                    Age:
                        student.age,

                    Address:
                        student.address,

                    Courses:
                        student.courses.join(", ")
                })
            )
        );
    }
}