import { Student } from "../models/assignment2/Student";
import { StudentSortField } from "../models/assignment2/StudentSortField";
import { SortOrder } from "../models/assignment2/SortOrder";

type Comparator<T> = (first: T, second: T) => number;
export class StudentSorter {

  public sortDefault(students: Student[]): Student[] {
    return this.sortBy(students, "fullName", "ascending");
  }

  public sortBy(
    students: Student[],
    field: StudentSortField,
    order: SortOrder,
  ): Student[] {
    const direction = order === "ascending" ? 1 : -1;

    const comparator: Comparator<Student> = (firstStudent, secondStudent) => {
      const comparison = this.compareByField(firstStudent, secondStudent, field);

      if (comparison !== 0) {
        return comparison * direction;
      }

      return firstStudent.rollNumber - secondStudent.rollNumber;
    };

    return [...students].sort(comparator);
  }

  private compareByField(
    firstStudent: Student,
    secondStudent: Student,
    field: StudentSortField,
  ): number {
    switch (field) {
      case "fullName":
        return firstStudent.fullName.localeCompare(secondStudent.fullName);

      case "rollNumber":
        return firstStudent.rollNumber - secondStudent.rollNumber;

      case "age":
        return firstStudent.age - secondStudent.age;

      case "address":
        return firstStudent.address.localeCompare(secondStudent.address);

      default: {
        const exhaustiveCheck: never = field;
        throw new Error(`Unhandled sort field: ${exhaustiveCheck}`);
      }
    }
  }
}