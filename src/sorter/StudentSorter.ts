import { Student } from "../models/assignment2/Student";

import { StudentSortField } from "../models/assignment2/StudentSortField";

import { SortOrder } from "../models/assignment2/SortOrder";

import { Comparator, InsertionSorter } from "./InsertionSorter";

export class StudentSorter {
  private readonly defaultComparator: Comparator<Student> = (
    firstStudent,
    secondStudent,
  ) => {
    const nameComparison = firstStudent.fullName.localeCompare(
      secondStudent.fullName,
    );

    if (nameComparison !== 0) {
      return nameComparison;
    }

    return firstStudent.rollNumber - secondStudent.rollNumber;
  };

  public sortDefault(students: Student[]): Student[] {
    return InsertionSorter.sort(students, this.defaultComparator);
  }

  public insertInDefaultOrder(
    students: Student[],
    student: Student,
  ): Student[] {
    return InsertionSorter.insertSorted(
      students,
      student,
      this.defaultComparator,
    );
  }

  public sortBy(
    students: Student[],
    field: StudentSortField,
    order: SortOrder,
  ): Student[] {
    const direction = order === "ascending" ? 1 : -1;

    const comparator: Comparator<Student> = (firstStudent, secondStudent) => {
      const comparison = this.compareStudents(
        firstStudent,
        secondStudent,
        field,
      );

      if (comparison !== 0) {
        return comparison * direction;
      }

      return firstStudent.rollNumber - secondStudent.rollNumber;
    };

    return InsertionSorter.sort(students, comparator);
  }

  private compareStudents(
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
    }
  }
}
