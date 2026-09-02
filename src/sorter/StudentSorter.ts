import { Student }
    from "../models/assignment2/Student";

import { StudentSortField }
    from "../models/assignment2/StudentSortField";

import { SortOrder }
    from "../models/assignment2/SortOrder";

export class StudentSorter {

    public sortDefault(
        students: Student[]
    ): Student[] {

        return [...students].sort(
            (firstStudent, secondStudent) => {

                const nameComparison =
                    firstStudent.fullName.localeCompare(
                        secondStudent.fullName
                    );

                if (nameComparison !== 0) {
                    return nameComparison;
                }

                return (
                    firstStudent.rollNumber -
                    secondStudent.rollNumber
                );
            }
        );
    }

    public sortBy(
        students: Student[],
        field: StudentSortField,
        order: SortOrder
    ): Student[] {

        const direction =
            order === "ascending"
                ? 1
                : -1;

        return [...students].sort(
            (firstStudent, secondStudent) => {

                const comparison =
                    this.compareStudents(
                        firstStudent,
                        secondStudent,
                        field
                    );

                if (comparison !== 0) {
                    return comparison * direction;
                }

                return (
                    firstStudent.rollNumber -
                    secondStudent.rollNumber
                );
            }
        );
    }

    private compareStudents(
        firstStudent: Student,
        secondStudent: Student,
        field: StudentSortField
    ): number {

        switch (field) {

            case "fullName":
                return firstStudent.fullName.localeCompare(
                    secondStudent.fullName
                );

            case "rollNumber":
                return (
                    firstStudent.rollNumber -
                    secondStudent.rollNumber
                );

            case "age":
                return (
                    firstStudent.age -
                    secondStudent.age
                );

            case "address":
                return firstStudent.address.localeCompare(
                    secondStudent.address
                );
        }
    }
}