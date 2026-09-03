import { StudentInputCollector } from "./StudentInputCollector";
import { StudentRepository } from "./StudentRepository";
import { StudentFactory } from "../factory/assignment2/StudentFactory";
import { InputParser } from "../parser/InputParser";
import { StudentInputMapper } from "../utils/assignment2/StudentInputMapper";

export class StudentRegistration {
  constructor(
    private readonly inputCollector: StudentInputCollector,
    private readonly inputParser: InputParser,
    private readonly studentFactory: StudentFactory,
    private readonly studentRepository: StudentRepository,
    private readonly studentInputMapper: StudentInputMapper,
  ) {}

  public async registerStudent(): Promise<void> {
    const rawInput = await this.inputCollector.collect();

    const parsedRecord = this.inputParser.parseRecord(rawInput);

    const studentInput = this.studentInputMapper.map(parsedRecord);

    const student = this.studentFactory.create(studentInput);

    this.studentRepository.addStudent(student);
  }
}
